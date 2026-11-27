import { useState, useRef } from 'react';

export default function Contact() {
  const [form, setForm]       = useState({ fullname: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus]   = useState(null); // { type: 'success'|'error'|'loading', html: string }
  const submitRef = useRef(null);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const showStatus = (type, html) => setStatus({ type, html });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, message } = form;
    if (!fullname.trim() || !email.trim() || !message.trim()) {
      showStatus('error', '<i class="fa-solid fa-circle-exclamation"></i> Please fill in your name, email, and message.');
      return;
    }

    setSending(true);
    showStatus('loading', '<i class="fa-solid fa-spinner fa-spin"></i> Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data && data.success) {
        showStatus('success', '<i class="fa-solid fa-circle-check"></i> ' +
          (data.message || 'Message sent! A confirmation email has been sent to your inbox.'));
        setForm({ fullname: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error((data && data.message) ? data.message : `Error ${response.status}`);
      }
    } catch (err) {
      showStatus('error', '<i class="fa-solid fa-triangle-exclamation"></i> ' +
        (err.message || 'Something went wrong. Please try again or email sajeeshalexander@gmail.com.'));
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact" id="contact1">
      <h2 className="heading">Contact <span>Me</span></h2>
      <form id="contactForm" onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Full Name"
            required
            value={form.fullname}
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            pattern="[0-9+\-\s]{7,15}"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />
        </div>
        <div className="input-group-2">
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            cols={30}
            rows={10}
            required
            value={form.message}
            onChange={handleChange}
          />
          <input
            type="submit"
            id="submitBtn"
            value={sending ? 'Sending...' : 'Send Message'}
            className="btn"
            disabled={sending}
            ref={submitRef}
          />
          {status && (
            <div
              id="formStatus"
              className={`form-status ${status.type}`}
              role="status"
              dangerouslySetInnerHTML={{ __html: status.html }}
            />
          )}
        </div>
      </form>
    </section>
  );
}
