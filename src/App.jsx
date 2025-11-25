import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    interests: '',
    wishList: '',
    encouragement: '',
    parentEmail: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = `DnB Santa Video Request for ${formData.childName}`
    const body = `
Child's Name: ${formData.childName}
Age: ${formData.age}
Interests: ${formData.interests}
Wish List: ${formData.wishList}
Encouragement Message: ${formData.encouragement}
Parent Email: ${formData.parentEmail}
    `.trim()
    
    window.location.href = `mailto:chris@chrisptee.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #c41e3a 0%, #228b22 100%)',
        padding: '40px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <img 
          src="https://dnbsanta.netlify.app/logo.png" 
          alt="DnB Santa Logo"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>
          🎅 DnB Santa 🎵
        </h1>
        <p style={{ fontSize: '1.3rem', margin: '0 0 10px 0', color: '#ffeb3b' }}>
          "Every Child Deserves a Magical Christmas Message"
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.9 }}>
          Free personalized Christmas video messages with drum & bass magic!
        </p>
      </div>

      {/* Video Section */}
      <div style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: '#fafafa'
      }}>
        <h2 style={{ marginBottom: '20px' }}>See the Magic in Action 🎥</h2>
        <div style={{
          maxWidth: '640px',
          margin: '0 auto',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          <iframe
            width="100%"
            height="360"
            src="https://www.youtube.com/embed/6zd0_HMqYLY"
            title="DnB Santa Video Example"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p style={{ marginTop: '15px', color: '#666' }}>
          Free videos are up to 30 seconds and similar to this example
        </p>
      </div>

      {/* Request Form */}
      <div id="request-form" style={{
        padding: '40px 20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          🎁 Request Your Free Video
        </h2>
        
        {submitted ? (
          <div style={{
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#e8f5e9',
            borderRadius: '10px',
            border: '2px solid #4caf50'
          }}>
            <h3 style={{ color: '#2e7d32' }}>✅ Request Received!</h3>
            <p>Your email app should have opened with your request details.</p>
            <p>DnB Santa will get back to you within 3-7 days!</p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                marginTop: '15px',
                padding: '10px 25px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Child's Name *
              </label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                required
                placeholder="Enter child's name"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                max="18"
                placeholder="Child's age"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Interests/Hobbies
              </label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g., dinosaurs, football, drawing..."
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Christmas Wish List
              </label>
              <input
                type="text"
                name="wishList"
                value={formData.wishList}
                onChange={handleChange}
                placeholder="e.g., a new bike, art supplies, video games..."
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Encouragement Message
              </label>
              <textarea
                name="encouragement"
                value={formData.encouragement}
                onChange={handleChange}
                placeholder="e.g., struggling with reading, being kind to siblings, trying their best..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Your Email *
              </label>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                required
                placeholder="Where should we send the video?"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '15px 30px',
                fontSize: '1.2rem',
                backgroundColor: '#c41e3a',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#a01830'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#c41e3a'}
            >
              🎁 Request Free Video
            </button>
          </form>
        )}
      </div>

      {/* About Section */}
      <div style={{
        padding: '40px 20px',
        backgroundColor: '#fff3e0',
        textAlign: 'center'
      }}>
        <h2>What is DnB Santa? 🎅</h2>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left', lineHeight: '1.8' }}>
          <p>
            DnB Santa is a <strong>completely FREE</strong> service offering personalized Christmas video 
            messages for children who need encouragement. Created by Chris P Tee, a Magic Circle magician 
            with 30+ years of experience, each video is crafted with care, magic, and a touch of drum & bass swagger!
          </p>
          <p>
            Whether your child needs encouragement with homework, being kind to siblings, or just a magical 
            boost of Christmas cheer, DnB Santa is here to help. Videos are up to 30 seconds long and 
            delivered directly to your email.
          </p>
        </div>
      </div>

      {/* Donation Section */}
      <div style={{
        padding: '30px 20px',
        backgroundColor: '#ffebee',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          ☕ Please Consider Buying Me a Coffee ONLY if You Can Afford to. 
          Otherwise Share and Pay it Forward. You have a Magical Christmas, Love from DnB Santa xx
        </p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://www.buymeacoffee.com/chrispteemagician" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffdd00',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            ☕ Buy Me a Coffee
          </a>
          <a 
            href="https://www.ko-fi.com/zoom" 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff5e5b',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            ❤️ Ko-fi
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '20px',
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center'
      }}>
        <p>© 2025 DnB Santa | Created with ❤️ by Chris P Tee</p>
        <p style={{ marginTop: '10px' }}>
          <a href="mailto:chris@chrisptee.co.uk" style={{ color: '#ffeb3b' }}>chris@chrisptee.co.uk</a>
        </p>
      </footer>
    </div>
  )
}

export default App
