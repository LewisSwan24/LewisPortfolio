'use client';

import { useState } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/cn';

interface NewsletterSignupProps {
  className?: string;
  dict?: Record<string, any>;
}

export function NewsletterSignup({ className, dict }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setMessage(data.message || 'Thanks for subscribing!');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={cn('rounded-2xl border border-border bg-card p-6', className)}>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Subscribe to updates
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Get notified when I publish new articles or projects.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Honeypot field — hidden from real users, bots will fill it */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 h-0 w-0 overflow-hidden"
          aria-hidden="true"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            disabled={status === 'loading' || status === 'success'}
          />
          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="shrink-0"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>

        {status !== 'idle' && status !== 'loading' && (
          <p className={cn(
            'text-sm',
            status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          )}>
            {message}
          </p>
        )}
      </form>

      <p className="text-xs text-muted-foreground mt-4">
        No spam, unsubscribe at any time.
      </p>
    </div>
  );
}
