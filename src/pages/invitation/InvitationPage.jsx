import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatDate } from '../../lib/utils';
import {
  Share2,
  Copy,
  ExternalLink,
  Check,
  Eye,
  Globe,
  Sparkles,
  Heart,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function InvitationPage() {
  const { activeWedding } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [inviteData, setInviteData] = useState({
    brideName: activeWedding?.brideName || 'Kavya Sharma',
    groomName: activeWedding?.groomName || 'Rohan Verma',
    weddingDate: activeWedding?.weddingDate || '2026-12-18',
    weddingTime: activeWedding?.weddingTime || '18:30',
    venueName: activeWedding?.venueName || 'The Leela Palace, Udaipur',
    venueAddress: activeWedding?.venueAddress || 'Lake Pichola, Udaipur, Rajasthan 313001',
    customMessage:
      'Two lives, two hearts, joined together in friendship, united forever in love. We cordially request your gracious presence to celebrate this auspicious union.',
    hostNames: 'The Sharma & Verma Families',
    slug: 'kavya-rohan-royal-celebration',
  });

  const publicUrl = `${window.location.origin}/invite/${inviteData.slug}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `✨ You're cordially invited to celebrate the wedding of ${inviteData.brideName} & ${inviteData.groomName}!\n\nView our official digital wedding invitation here: ${publicUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header with Publishing Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-surface-border bg-surface-card">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-100 flex items-center gap-2">
            Digital Invitation Studio
            <Badge variant="gold">Luxury Card</Badge>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Build, live-preview, and publish an elegant guest invitation webpage with instant sharing.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant={isPublished ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setIsPublished(!isPublished)}
          >
            <Globe className="w-4 h-4" />
            {isPublished ? 'Published to Public' : 'Draft / Unpublished'}
          </Button>

          <Button variant="outline" size="sm" onClick={copyUrl}>
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Link!' : 'Copy Link'}
          </Button>

          <Button variant="secondary" size="sm" onClick={shareWhatsApp}>
            <Share2 className="w-4 h-4 text-emerald-400" />
            WhatsApp
          </Button>
        </div>
      </div>

      {/* Dual Pane: Editor Form & Live Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Pane: Editor */}
        <Card className="space-y-4">
          <CardHeader
            title="Invitation Content & Details"
            subtitle="Modifications reflect live in the luxury preview card"
          />

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 mb-1">Bride's Full Name</label>
                <input
                  type="text"
                  value={inviteData.brideName}
                  onChange={(e) => setInviteData({ ...inviteData, brideName: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Groom's Full Name</label>
                <input
                  type="text"
                  value={inviteData.groomName}
                  onChange={(e) => setInviteData({ ...inviteData, groomName: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-400 mb-1">Wedding Date</label>
                <input
                  type="date"
                  value={inviteData.weddingDate}
                  onChange={(e) => setInviteData({ ...inviteData, weddingDate: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Auspicious Muhurat / Time</label>
                <input
                  type="time"
                  value={inviteData.weddingTime}
                  onChange={(e) => setInviteData({ ...inviteData, weddingTime: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Venue Name</label>
              <input
                type="text"
                value={inviteData.venueName}
                onChange={(e) => setInviteData({ ...inviteData, venueName: e.target.value })}
                className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Venue Address</label>
              <input
                type="text"
                value={inviteData.venueAddress}
                onChange={(e) => setInviteData({ ...inviteData, venueAddress: e.target.value })}
                className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Host & Family Line</label>
              <input
                type="text"
                value={inviteData.hostNames}
                onChange={(e) => setInviteData({ ...inviteData, hostNames: e.target.value })}
                className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Custom Invitation Message</label>
              <textarea
                rows="3"
                value={inviteData.customMessage}
                onChange={(e) => setInviteData({ ...inviteData, customMessage: e.target.value })}
                className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Unique Invitation Slug</label>
              <div className="flex items-center gap-1 bg-surface-muted border border-surface-border rounded-lg px-2.5 py-1.5 text-gray-400 font-mono text-[11px]">
                <span>.../invite/</span>
                <input
                  type="text"
                  value={inviteData.slug}
                  onChange={(e) => setInviteData({ ...inviteData, slug: e.target.value })}
                  className="bg-transparent text-gray-100 flex-1 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Right Pane: Luxury Live Card Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-primary-400" />
              Live Guest View Preview
            </span>
            <Link
              to={`/invite/${inviteData.slug}`}
              target="_blank"
              className="text-primary-400 hover:text-primary-300 flex items-center gap-1"
            >
              Open Fullscreen <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Invitation Card */}
          <div className="relative rounded-3xl p-8 md:p-10 border-2 border-primary-500/40 bg-gradient-to-b from-[#16140D] via-[#0E0D09] to-[#1A1710] shadow-2xl text-center space-y-6 overflow-hidden">
            {/* Corner Luxury Floral Flourishes */}
            <div className="absolute top-3 left-3 text-primary-500/30 text-2xl font-serif">❧</div>
            <div className="absolute top-3 right-3 text-primary-500/30 text-2xl font-serif">☙</div>
            <div className="absolute bottom-3 left-3 text-primary-500/30 text-2xl font-serif">❧</div>
            <div className="absolute bottom-3 right-3 text-primary-500/30 text-2xl font-serif">☙</div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] uppercase tracking-[0.3em] font-semibold">
                  Royal Wedding Invitation
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs text-primary-200/80 font-serif italic">{inviteData.hostNames}</p>
              <p className="text-xs text-gray-400">cordially invite you to celebrate the wedding of</p>
            </div>

            <div className="py-4 border-y border-primary-500/20">
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide gold-gradient-text">
                {inviteData.brideName}
              </h2>
              <div className="my-2 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-primary-500/40" />
                <Heart className="w-4 h-4 text-primary-400 fill-primary-400" />
                <div className="h-px w-12 bg-primary-500/40" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide gold-gradient-text">
                {inviteData.groomName}
              </h2>
            </div>

            <p className="text-xs text-gray-300 italic max-w-md mx-auto leading-relaxed">
              "{inviteData.customMessage}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-primary-500/20 text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-primary-500/20 space-y-1">
                <Calendar className="w-4 h-4 text-primary-400 mx-auto" />
                <div className="font-semibold text-gray-200">{formatDate(inviteData.weddingDate)}</div>
                <div className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" /> {inviteData.weddingTime} IST
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-primary-500/20 space-y-1">
                <MapPin className="w-4 h-4 text-primary-400 mx-auto" />
                <div className="font-semibold text-gray-200 truncate">{inviteData.venueName}</div>
                <div className="text-[11px] text-gray-400 truncate">{inviteData.venueAddress}</div>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] tracking-widest uppercase text-primary-400/60">
                #KavyaWedsRohan • Bless The Couple
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
