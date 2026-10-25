import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';
import { Sparkles, Heart, Calendar, Clock, MapPin, Share2, Copy, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function PublicInvitationPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  // In real Supabase setup, query wedding_public_invitations where slug = slug and is_published = true
  const invite = {
    brideName: 'Kavya Sharma',
    groomName: 'Rohan Verma',
    weddingDate: '2026-12-18',
    weddingTime: '18:30',
    venueName: 'The Leela Palace, Udaipur',
    venueAddress: 'Lake Pichola, Udaipur, Rajasthan 313001',
    customMessage:
      'Two lives, two hearts, joined together in friendship, united forever in love. We cordially request the honor of your presence and blessings as we embark on this sacred journey of marriage.',
    hostNames: 'The Sharma & Verma Families',
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `✨ You're cordially invited to celebrate the wedding of ${invite.brideName} & ${invite.groomName}!\n\nView our official digital wedding invitation here: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-gray-100 flex flex-col items-center justify-center p-4 selection:bg-gold/30 selection:text-gold-light">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-2xl relative z-10 py-10 space-y-6">
        {/* Guest Card */}
        <div className="relative rounded-3xl p-8 md:p-14 border border-primary-500/40 bg-gradient-to-b from-[#16140D] via-[#0E0D09] to-[#1A1710] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] text-center space-y-8">
          {/* Ornate corner motifs */}
          <div className="absolute top-4 left-4 text-primary-500/40 text-3xl font-serif">❧</div>
          <div className="absolute top-4 right-4 text-primary-500/40 text-3xl font-serif">☙</div>
          <div className="absolute bottom-4 left-4 text-primary-500/40 text-3xl font-serif">❧</div>
          <div className="absolute bottom-4 right-4 text-primary-500/40 text-3xl font-serif">☙</div>

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-primary-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-[0.35em] font-semibold text-primary-300">
                Wedding Invitation
              </span>
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-sm font-serif italic text-primary-200/90">{invite.hostNames}</p>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              cordially request the honour of your presence at the wedding ceremony of
            </p>
          </div>

          <div className="py-6 border-y border-primary-500/30">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-wide gold-gradient-text">
              {invite.brideName}
            </h1>
            <div className="my-3 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-primary-500/40" />
              <Heart className="w-5 h-5 text-primary-400 fill-primary-400" />
              <div className="h-px w-16 bg-primary-500/40" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-wide gold-gradient-text">
              {invite.groomName}
            </h1>
          </div>

          <p className="text-sm text-gray-300 italic max-w-lg mx-auto leading-relaxed">
            "{invite.customMessage}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-primary-500/20 text-xs">
            <div className="p-4 rounded-xl bg-black/50 border border-primary-500/20 space-y-1.5">
              <Calendar className="w-5 h-5 text-primary-400 mx-auto" />
              <div className="font-semibold text-sm text-gray-200">{formatDate(invite.weddingDate)}</div>
              <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {invite.weddingTime} IST
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-primary-500/20 space-y-1.5">
              <MapPin className="w-5 h-5 text-primary-400 mx-auto" />
              <div className="font-semibold text-sm text-gray-200">{invite.venueName}</div>
              <div className="text-xs text-gray-400">{invite.venueAddress}</div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="sm" onClick={shareWhatsApp}>
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </Button>
            <Button variant="outline" size="sm" onClick={copyUrl}>
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied Invitation Link' : 'Copy Invitation Link'}
            </Button>
          </div>
        </div>

        {/* Guest Footer */}
        <div className="text-center text-xs text-gray-500">
          Powered by{' '}
          <Link to="/" className="text-primary-400 hover:underline">
            Make My Marriage
          </Link>{' '}
          • Luxury Wedding Experience
        </div>
      </div>
    </div>
  );
}
