import React, { useRef, useEffect, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';
import Image from 'next/image';
import IntroductionImage from '@/public/images/2.png';
interface CallProps {
    room: string | null;
    setRoom: (room: string | null) => void;
}

const CALL_OPTIONS = {
    // Add your call options here
};

const Call: React.FC<CallProps> = ({ room, setRoom }) => {
    const callRef = useRef<HTMLDivElement>(null);
    const youtubeRef = useRef<HTMLIFrameElement>(null); // Reference to the YouTube iframe
    const [callFrames, setCallFrames] = useState<any[]>([]);

    const [isShowVideo, setIsShowVideo] = useState<boolean>(false)

    useEffect(() => {
        const createAndJoinCall = async () => {
            if (!callRef.current || !room) return;

            // Create a new call frame
            const newCallFrame = DailyIframe.createFrame(callRef.current, CALL_OPTIONS);

            try {
                await newCallFrame.join({ url: room });

                setCallFrames((prevFrames) => [...prevFrames, newCallFrame]);
                setIsShowVideo(true)
                // Play the YouTube video when the user joins the call
                if (youtubeRef.current) {
                    youtubeRef.current.contentWindow?.postMessage(
                        '{"event":"command","func":"playVideo","args":""}',
                        '*'
                    );
                }

                // Event listener for when the participant leaves
                newCallFrame.on('left-meeting', () => {
                    setRoom(null);
                    setCallFrames((prevFrames) => prevFrames.filter((frame) => frame !== newCallFrame));
                    newCallFrame.destroy();
                    setIsShowVideo(false)
                    // Pause the video when leaving the call
                    if (youtubeRef.current) {
                        youtubeRef.current.contentWindow?.postMessage(
                            '{"event":"command","func":"pauseVideo","args":""}',
                            '*'
                        );
                    }
                });
            } catch (error) {
                console.error('Error joining call:', error);
                // Handle the error appropriately, e.g., display an error message
            }
        };

        createAndJoinCall();

        // Cleanup
        return () => {
            callFrames.forEach((frame) => {
                frame.leave();
                frame.destroy();
            });
            setCallFrames([]);
        };
    }, [room]);

    return (
        <div className="flex w-full">
            {
                isShowVideo && <div className="flex flex-col w-[20%] items-center justify-start absolute lg:top-24 lg:left-16 md:top-20 md:left-12 sm:top-16 sm:left-8 top-12 left-4"
                >
                    {/* <span className="text-white text-2xl overflow-hidden border-r-2 border-white whitespace-nowrap animate-typing">
                        Leicester vs Tottenham
                    </span>
                    <span className="text-white text-lg">1&nbsp;:&nbsp;1</span> */}
                    <Image src={IntroductionImage} alt='image' className="relative w-full max-w-[120px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[420px] xl:max-w-[480px]" />
                    <div className="relative w-full pb-[56.25%] max-w-[120px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[420px] xl:max-w-[480px]">
                        <iframe
                            src="https://www.youtube.com/OMSplpXFXLk?autoplay=1&mute=1&si=NWZx3ZVzikI9YCN1"
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            }

            <div ref={callRef} className="w-full h-[800px] rounded-xl" />
        </div>
    );
};

export default Call;
