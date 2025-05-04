'use client';

import { FacebookIcon, TwitterIcon, LinkedinIcon, LinkIcon } from 'lucide-react';

export default function ShareButtons({ title, url }) {
    const fullUrl = `${window.location.origin}${url}`;

    const shareOnFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
            '_blank'
        );
    };

    const shareOnTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
            '_blank'
        );
    };

    const shareOnLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
            '_blank'
        );
    };

    const copyLink = () => {
        navigator.clipboard.writeText(fullUrl);
        alert('Lien copié dans le presse-papiers !');
    };

    return (
        <div className="flex space-x-4 mt-8">
            <button
                onClick={shareOnFacebook}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
                <FacebookIcon className="w-5 h-5" />
            </button>
            <button
                onClick={shareOnTwitter}
                className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
            >
                <TwitterIcon className="w-5 h-5" />
            </button>
            <button
                onClick={shareOnLinkedIn}
                className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900"
            >
                <LinkedinIcon className="w-5 h-5" />
            </button>
            <button
                onClick={copyLink}
                className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
            >
                <LinkIcon className="w-5 h-5" />
            </button>
        </div>
    );
}