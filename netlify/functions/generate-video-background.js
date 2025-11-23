import { DnBSantaPipeline } from '../../automation/pipeline.js';

export const handler = async (event) => {
  // This is a Netlify Background Function - no timeout limit!
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { requestId, isBonus, childName, recipientName, parentEmail } = JSON.parse(event.body);
    
    // Initialize pipeline with environment variables
    const pipeline = new DnBSantaPipeline({
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      elevenlabsApiKey: process.env.ELEVENLABS_API_KEY,
      elevenlabsVoiceId: process.env.ELEVENLABS_VOICE_ID,
      visionstoryApiKey: process.env.VISIONSTORY_API_KEY,
      visionstoryAvatarId: process.env.VISIONSTORY_AVATAR_ID,
      resendApiKey: process.env.RESEND_API_KEY,
      supabaseUrl: process.env.VITE_SUPABASE_URL,
      supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
      fromEmail: process.env.FROM_EMAIL || 'chris@chrisptee.co.uk',
      fromName: process.env.FROM_NAME || 'DnB Santa'
    });

    // Handle bonus video generation
    if (isBonus) {
      if (!childName || !recipientName || !parentEmail) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Child name, recipient name, and parent email required for bonus video' })
        };
      }

      console.log(`🎁 Starting bonus video generation: ${childName} → ${recipientName}`);
      await pipeline.processBonusVideo(childName, recipientName, parentEmail);
      console.log(`✅ Bonus video generation complete`);

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          message: 'Bonus video generation started successfully'
        })
      };
    }

    // Handle regular video generation
    if (!requestId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Request ID required' })
      };
    }

    console.log(`🎅 Starting video generation for request ${requestId}`);
    await pipeline.processRequest(requestId);
    console.log(`✅ Video generation complete for request ${requestId}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Video generation started successfully'
      })
    };

  } catch (error) {
    console.error('❌ Error in video generation:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Video generation failed',
        message: error.message 
      })
    };
  }
};
