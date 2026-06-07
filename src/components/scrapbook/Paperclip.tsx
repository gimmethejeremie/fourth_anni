import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type PaperclipProps = {
  id: string;
  note: string;
  onOpen: () => void;
};

export const Paperclip = ({ id, note, onOpen }: PaperclipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      onOpen();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="paperclipContainer">
      <div 
        className="paperclipIcon" 
        onClick={handleToggle}
        role="button"
        tabIndex={0}
      >
        📎
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="paperclipNote"
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
          >
            <div className="foldedPaper">
              {note}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
