import { useTranslation } from "react-i18next";
import HeroVideoDialog from "../components/HeroDialog/HeroVideoDialog";
import TextReveal from "../components/TextReveal/TextReveal";
import { Dock, DockIcon } from "../components/Dock/Dock";

const Animations = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="animations-container">
      <div className="animations-dock">
        <div className="relative">
          <Dock direction="middle">
            <DockIcon>
              <p className="dock-p">Home</p>
            </DockIcon>
            <DockIcon>
              <p className="dock-p">Portfolio</p>
            </DockIcon>
            <DockIcon>
              <p className="dock-p">Oferta</p>
            </DockIcon>
            <DockIcon>
              <p className="dock-p">Kontakt</p>
            </DockIcon>
          </Dock>
        </div>
      </div>
      <div>
        <div className="relative ">
          <HeroVideoDialog
            className="hidden dark:block "
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
            thumbnailSrc="/media/ratownik.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
      <div className="magic-text">
        <div className="z-10 flex min-h-[16rem] items-center justify-center rounded-lg">
          <TextReveal text="FAMA FILM: Capturing stories, one frame at a time." />
        </div>
      </div>

      <div className="about-img-container">
        <img src="/media/krzys.jpeg"></img>
      </div>
    </div>
  );
};

export default Animations;
