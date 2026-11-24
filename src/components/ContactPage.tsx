import React, { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import ContactWithGlobe from '@/components/ui/contact-with-globe';
import { validateContactForm } from '../utils/clavionLogic';
import { INTRO_CALL_URL } from '../lib/introCall';
import { submitToFormBold } from '../lib/formbold';

interface ContactPageProps {
  onNavigate: (to: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      message: message.trim(),
    };

    const validation = validateContactForm(payload);
    if (!validation.valid) {
      setFormError(validation.error || 'Please check your input and try again.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      const result = await submitToFormBold({
        ...payload,
        plan: 'Contact Page Inquiry',
        source: 'Contact Page',
      });

      if (!result.ok) {
        setFormError(result.error || 'Unable to submit request. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const leadRecord = {
        ...payload,
        id: `lead_${Date.now()}`,
        receivedAt: new Date().toISOString(),
      };

      try {
        const existingRaw = window.localStorage.getItem('heydots_leads');
        const existingLeads = existingRaw ? JSON.parse(existingRaw) : [];
        existingLeads.push(leadRecord);
        window.localStorage.setItem('heydots_leads', JSON.stringify(existingLeads));
        window.sessionStorage.setItem('heydots_last_lead', JSON.stringify(leadRecord));
      } catch {
        // Ignore storage quota errors
      }

      setIsSubmitted(true);
    } catch {
      setFormError('Network error while sending your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormError(null);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
  };

  return (
    <div className="relative z-10 px-4 pb-14 pt-9 sm:px-5">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex justify-center">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex min-h-11 items-center px-1 focus:outline-none"
            aria-label="HeyDots Home"
          >
            <span className="font-pacifico text-[32px] tracking-[0.01em] text-[#f3f5fa] drop-shadow-[0_2px_16px_rgba(255,255,255,0.2)] sm:text-[36px]">
              HeyDots
            </span>
          </a>
        </div>

        <ContactWithGlobe
          title="Contact us"
          subtitle="Start a conversation"
          description="Share your workflow goals or book a 30-minute call. Our engineering team responds within 24 business hours."
          links={[
            { icon: Mail, label: 'info@heydots.com', href: 'mailto:info@heydots.com' },
            {
              icon: Phone,
              label: 'Book a 30-min call',
              href: INTRO_CALL_URL,
              external: true,
            },
          ]}
          name={name}
          email={email}
          company={company}
          message={message}
          onNameChange={setName}
          onEmailChange={setEmail}
          onCompanyChange={setCompany}
          onMessageChange={setMessage}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
          formError={formError}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};
