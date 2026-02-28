"use client";

import React, { useState, useEffect } from "react";
import { getVideoViewUrl } from "@/services/course/video";
import Modal from "@/components/modals/formModal";

interface VideoPlayerProps {
  videoID: string;
  videoName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerProps> = ({
  videoID,
  videoName,
  isOpen,
  onClose,
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && videoID) {
      setLoading(true);
      setError(null);
      getVideoViewUrl(videoID)
        .then((url) => {
          setVideoUrl(url);
        })
        .catch((err) => {
          setError(err.message || "Failed to load video");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setVideoUrl(null);
    }
  }, [isOpen, videoID]);

  return (
    <Modal modelTitle={videoName} isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        {loading && (
          <div className="flex justify-center py-8">
            <span className="text-gray-500">Loading video...</span>
          </div>
        )}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        )}
        {videoUrl && !loading && (
          <video
            controls
            className="w-full rounded-lg"
            src={videoUrl}
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </Modal>
  );
};
