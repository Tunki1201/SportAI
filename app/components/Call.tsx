import React, { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';

interface CallProps {
    room: string | null;
    setRoom: (room: string | null) => void;
}

const CALL_OPTIONS = {
    // Add your call options here  
};

const Call: React.FC<CallProps> = ({ room, setRoom }) => {
    const callRef = useRef<HTMLDivElement>(null);
    const [callFrames, setCallFrames] = useState<any[]>([]); // Use state to store multiple call frames

    useEffect(() => {
        const createAndJoinCall = async () => {
            if (!callRef.current || !room) return;

            // Create a new call frame
            const newCallFrame = DailyIframe.createFrame(callRef.current, CALL_OPTIONS);

            try {
                await newCallFrame.join({ url: room });

                setCallFrames((prevFrames) => [...prevFrames, newCallFrame]); // Add new call frame to the array

                // Event listener for when the participant leaves
                newCallFrame.on('left-meeting', () => {
                    setRoom(null);
                    setCallFrames((prevFrames) => prevFrames.filter((frame) => frame !== newCallFrame)); // Remove call frame from the array
                    newCallFrame.destroy();
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
    }, [room]); // Only re-run the effect when the `room` changes

    return <div ref={callRef} className='w-full h-[800px] rounded-xl' />;
};

export default Call;
