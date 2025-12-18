import "./Home.scss";
import Navbar from "../components/Navbar/Navbar";
import Section from "../components/Section/Section";
import LHS from "../components/LHS/LHS";
import RHS from "../components/RHS/RHS";
import Content from "../components/Content/Content";
import aboutImage from "../assets/images/about.png";
import chess2Title from "../assets/images/Chess2Logo.png";
import chess2Img1 from "../assets/images/chess 1.png";
import chess2Img2 from "../assets/images/chess 2.png";
import heuristic from "../assets/images/heuristic.png";
import rwalker from "../assets/images/rwalker.png";
import iCanFly from "../assets/images/icf.png";
import iCanFlyBg from "../assets/images/icfbg.png";
import rwalkerBg from "../assets/images/rwalkerBg.png";
import heuristicBg from "../assets/images/heuBg.png";
import chess2Bg from "../assets/images/chess2Bg.png";
import divider from "../assets/images/divider.png";
import contactBg from "../assets/images/contactBg.png";
import email from "../assets/images/email.png";
import location from "../assets/images/location_on.png";

export default function Home() {
  return (
    <>
      <div className="portfolio-container">
        <Navbar />

        <Section
          id="about"
          lhs={
            <LHS>
              <Content type="image" value={aboutImage} />
            </LHS>
          }
          rhs={
            <RHS headerText="Hi,">
              <Content
                type="text"
                value="I am a UX Designer specialising in game experiences, with a strong focus on research-driven design."
              />
              <Content
                type="text"
                value="I use player research, usability testing, and iterative prototyping to understand player behaviour, identify pain points, and create engaging, intuitive gameplay experiences."
              />
            </RHS>
          }
        />
        <img className="section-divider" src={divider} alt=""></img>
        <Section
          id="projects"
          bgImage={chess2Bg}
          topContent={<img className="title-img" src={chess2Title} alt="" />}
          lhs={
            <LHS>
              <Content type="image" value={chess2Img1} />
              <Content
                type="text"
                value="Chess 2.0 establishes a new strategic layer that was enjoyed by many users during a play test."
              />
              <Content
                type="text"
                value="To find out more about this project, you can read the GDD below:"
              />
              <Content
                type="button"
                value="Open GDD"
                url="https://docs.google.com/document/d/1_qhZnu0KQnrzz0PCcqbeHTuKBIwPlCEVm2guc_GxAPk/edit?usp=sharing"
              />
            </LHS>
          }
          rhs={
            <RHS>
              <Content
                type="text"
                value="Game devs always try their level best to balance characters by adjusting their abilities. What if we were to do this to one of the oldest board games?"
              />
              <Content
                type="text"
                value="Chess 2.0 explores new possibilities by introducing various pieces that belong within the monarchy. It readjusts some abilities of existing pieces by giving them power-ups or by nerfing them to balance out the game."
              />
              <Content type="image" value={chess2Img2} />
            </RHS>
          }
        />
        <img className="section-divider" src={divider} alt=""></img>
        <Section
          id="projects"
          bgImage={heuristicBg}
          topContent={<h1>Heuristic Evaluation</h1>}
          lhs={
            <LHS>
              <Content type="image" value={heuristic} />
            </LHS>
          }
          rhs={
            <RHS>
              <Content
                type="text"
                value="To understand how users may perceive a famous platform that is used for downloading and accessing thousands of games on a daily basis, I conducted a heuristic evaluation on the Steam mobile app based on Nielsen's 10 heuristics for user interface design."
              />
              <Content
                type="text"
                value="Based on my findings, I redesigned the app to make it more intuitive for users."
              />
              <Content
                type="text"
                value="The entire documentation for the heuristic evaluation is available below:"
              />
              <Content
                type="button"
                value="Open Evaluation"
                url="https://www.figma.com/deck/4ezhdrVqJ9NxD5vDwQmyLz/Heuristic-Evaluation-for-Steam?node-id=1-560&t=LK1yGbBeegmauUxE-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1"
              />
            </RHS>
          }
        />
        <img className="section-divider" src={divider} alt=""></img>
        <Section
          id="projects"
          bgImage={rwalkerBg}
          topContent={
            <h1>
              <u>Rhythm Walker</u>
            </h1>
          }
          lhs={
            <LHS>
              <Content type="image" value={rwalker} />
            </LHS>
          }
          rhs={
            <RHS>
              <Content
                type="text"
                value="Rhythm Walker is a high-definition music based game that replicates an arcade-like feel and gives users an immersive experience through visuals. "
              />
              <Content
                type="text"
                value="The objective is simple - Trace 3 or more words in a row to generate a streak and create a new high score."
              />
              <Content
                type="text"
                value="The GitHub repository to access more details and to download the game is available here:"
              />
              <Content
                type="button"
                value="Open Repository"
                url="https://github.com/MrQuazar/RhythmWalker/blob/main/README.md"
              />
            </RHS>
          }
        />
        <img className="section-divider" src={divider} alt=""></img>
        <Section
          id="projects"
          bgImage={iCanFlyBg}
          topContent={<h1>I Can Fly</h1>}
          lhs={
            <LHS>
              <Content
                type="text"
                value="I Can Fly is an endless runner game where the goal is to collect the golden eggs and use power-ups to avoid birds and crocodiles while setting a new high score."
              />
              <Content
                type="text"
                value="In-person usability testing showed positive results, with players highly engaged throughout the gameplay experience."
              />
              <Content
                type="text"
                value="This game is available for download on Google Drive here:"
              />
              <Content
                type="button"
                value="Open Drive"
                url="https://drive.google.com/drive/folders/1kQzsCD7EirS74b3gr9cnErRZW41PuVX-?usp=sharing"
              />
            </LHS>
          }
          rhs={
            <RHS>
              <Content type="image" value={iCanFly} />
            </RHS>
          }
        />
        <img className="section-divider" src={divider} alt=""></img>
        <Section
          id="contact"
          bgImage={contactBg}
          topContent={<h1>Contact Me</h1>}
          lhs={
            <LHS>
              <div className="personal-info-container">
                <div className="personal-info">
                  <Content type="image" value={email} />
                  <Content type="text" value="Email: mawrahk@gmail.com" />
                </div>
                <div className="personal-info">
                  <Content type="image" value={location} />
                  <Content type="text" value="London, UK" />
                </div>
              </div>
            </LHS>
          }
          rhs={
            <RHS>
              <div className="social-media-handles">
                <Content
                  type="button"
                  value="LinkedIn"
                  url="https://www.linkedin.com/in/mawrah-khan/"
                />
                <Content
                  type="button"
                  value="Instagram"
                  url="https://www.instagram.com/mawrah_khan_?igsh=MTNiMHAxN3owenV1ZQ=="
                />
              </div>
            </RHS>
          }
        />
      </div>
    </>
  );
}
