import { useState } from "react";
import { DialogueOverlayRequest } from "../../sections/sectionTypes";
import { GuideCharacter, guides } from "../../data/guides";

type MarginNoteProps = {
  id: string;
  author: string;
  text: string;
  requestDialogue: (dialogue: DialogueOverlayRequest) => void;
  onTrigger: () => void;
};

export const MarginNote = ({ id, author, text, requestDialogue, onTrigger }: MarginNoteProps) => {
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => {
    if (!hasClicked) {
      setHasClicked(true);
      onTrigger();
    }
    
    // Find speaker from guides or fallback to lilWayne
    const speaker: GuideCharacter = (guides as any)[author.replace("-", "")] || guides.lilWayne;

    requestDialogue({
      speaker,
      lines: [text],
      mood: "soft",
    });
  };

  return (
    <div 
      className={`marginNote ${hasClicked ? 'clicked' : ''}`} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <span className="noteText">{text}</span>
      <span className="noteAuthor">— {author}</span>
    </div>
  );
};
