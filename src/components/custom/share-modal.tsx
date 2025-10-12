"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Mail, Share2, Twitter, MessageSquare } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
    url: string;
    open: boolean;
    onClose: () => void;
}

export default function ShareModal({ url, open, onClose }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Ошибка копирования", err);
        }
    };

    const shareWhatsapp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank");
    };

    const shareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank");
    };

    const shareEmail = () => {
        window.open(`mailto:?subject=Поделиться ссылкой&body=${encodeURIComponent(url)}`);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-2xl p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center gap-2 text-lg font-semibold">
                        <Share2 className="w-5 h-5 text-primary" />
                        Поделиться
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-4 flex flex-col gap-3">
                    <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Copy className="w-4 h-4" />
                        {copied ? "Скопировано!" : "Скопировать ссылку"}
                    </Button>

                    <Button
                        onClick={shareWhatsapp}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                    >
                        <MessageSquare className="w-4 h-4" /> WhatsApp
                    </Button>

                    <Button
                        onClick={shareTwitter}
                        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white"
                    >
                        <Twitter className="w-4 h-4" /> Twitter / X
                    </Button>

                    <Button
                        onClick={shareEmail}
                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white"
                    >
                        <Mail className="w-4 h-4" /> Email
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
