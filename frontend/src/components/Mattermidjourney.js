import React, { useState } from "react";
import "./Matterblog.css";
import line from "../assets/Line 1.png";
import { TbHeart } from "react-icons/tb";
import midjourney1 from "../assets/midjourney1.png";
import midjourney2 from "../assets/midjourney2.png";
import midjourney3 from "../assets/midjourney3.png";
import midjourney4 from "../assets/midjourney4.png";
import midjourney5 from "../assets/midjourney5.png";
import midjourney6 from "../assets/midjourney6.png";
import Newsletter from "./Newsletter";

function Mattermidjourney() {
  const [isLiked, setIsLiked] = React.useState(false);
  return (
    <>
    <div className="matterblog">
      <div className="matterbloghero" id="midjourneyhero"></div>
      <div className="blog">
        <div className="blogtop">
          <div className="blogheading">Team building with MidJourney</div>
          <div className="blogsubhead">
            The relevance of human creativity in the era of Artificial
            Intelligence
          </div>
          <div className="blogheadbottom">
            <div className="author">
              <div className="authorname">Saoirse Tope</div>
              <div className="publishdate">20 OCTOBER 2022</div>
            </div>
            <img src={line} alt="lineseperator" className="bloglinetop" />
            {/* line img here */}
            {/* <div className="likebutton" onClick={() => setIsLiked(!isLiked)}>
              <TbHeart class={isLiked ? "liked" : "notliked"} />
            </div> */}
          </div>
        </div>
        <div className="blogcontent">
          <p className="blogpara">
            For the past few months, the world seems to be humming with faint
            murmurs about AI art. Names like DALL.E, MidJourney, Stable
            diffusion hover in the air, filling it with a curious energy.
            Experimentations with these AI bots seem almost like scratching the
            surface of a new, undiscovered world, a different planet, where the
            possibilities seem endless. We see artists, designers and Architects
            on the front lines of these explorations, and with good reason! The
            innovative, curious energy of creatives can’t be kept away from a
            platform with so much to offer. <br /> <br /> I’ve noticed
            discussing with my colleagues, joking about how AI will take over
            and soon creative people won’t be required anymore. These
            conversations are topics of discussion all over the internet, and
            offline. The worlds of art, architecture, design will be completely
            taken over by technology. <br /> <br />
            <strong>But don’t worry, you’re still somewhat relevant.</strong>
          </p>
          <p className="blogpara">
            Here are some architectural explorations by architects and designers
            spending time, giving thought and detailing out their prompts to the
            bot-
          </p>
          <div className="imagecenter">
            <img src={midjourney1} alt="" />
          </div>
          <p className="blogpara">
            Here are some architectural explorations by architects and designers
            spending time, giving thought and detailing out their prompts to the
            bot-
          </p>
          <div className="imagecenter">
            <img src={midjourney2} alt="" />
          </div>

          <p className="blogpara">
            We can always say beauty is in the eyes of the beholder but let’s
            face it, there’s a clear difference. <br /> <br /> This difference
            lies in my two months of professional design experience, and their
            years and decades of industry experience, education and growth. The
            difference lies in my lack of developed thought process, intention
            and knowledge.
          </p>
          <div className="blogheading">
            Austrian philosopher Ludwig Wittgenstein once said, “the limits of
            my language are the limits of my world”
          </div>
          <p className="blogpara">
            All designers, architects and creative people in general have
            intuition, and that intuition might come naturally to some, and with
            experience for others. This intuition is what is being challenged
            and threatened by being robotically mimicked. <br /> <br /> Andrew
            Kudless, Artist and University of Houston Architectural faculty,
            talked about the importance of intuition. He says, “What is this
            intuition built upon? If you don’t have the language to describe
            what direction you want to go with your [midjourney] prompt, the
            best intuition will not help you.” <br /> <br /> He also talks about
            how Midjourney assists him in his professional endeavors, especially
            in terms of efficiency in creative production of ideas for him and
            his students. He says,
          </p>
          <div className="blogheading">
            “AI will find its way into countless niches in the design process so
            it’s best to learn all you can. Some worry that AI technology is
            replacing humans, but my hope is that it will replace the drudgery
            of many tasks so that we can focus on synthesis and creativity.”
          </div>
          <p className="blogpara">
            The KlimArt team has started slowly experimenting with AI in
            different ways in our everyday work. From generating reference
            images to communicate concepts (using MidJourney), to using it in
            place of photoshop for content aware fill (DALL.E). <br /> As an
            office we conducted an activity using MidJourney AI. An expensive
            investment for a team building exercise, but in my opinion, it has a
            lot of potential in any creative office. <br /> <br /> Here’s a
            brief description of the activity- <br /> A bowl of folded paper
            chits contained names of famous structures, historical and
            architectural. The office was divided into two teams. The game
            played itself somewhat like ‘dumb charades’ where one person from
            each team (the prompter) would describe the building in their chit
            to the bot, using descriptive terms such as the location,
            architectural style, shape, colours, material, etc. They could not
            use any words in the name of the structure or the architect’s name.{" "}
            <br /> <br /> The motive of the game, apart from having fun as a
            team (and to avoid working for as long as possible) was to improve
            and test everyone's basic general knowledge, and ability to
            communicate ideas using relevant keywords. <br /> <br /> The game
            unfolded with a slow, unsure pace and soon grew into a loud,
            competitive, high energy environment. It converted from the Paris
            Opera Ballet to India VS Pakistan in Eden Garden’s stadium real
            fast. Shouts, arguments, laughter, praise, complaints, cheers,
            culminated into a ten point difference, with Team 2 leading. <br />{" "}
            <br /> Talking to a robot isn’t the same as talking to a person
            (well, in most cases). You have to be clear, concise, descriptive
            and precise. The bot doesn’t always ‘catch your vibe’, especially
            not in your first attempt. Language becomes a very strong tool and a
            very possible downfall when talking to a bot. <br /> <br /> For
            example, here are two prompts that made the structures very easy to
            identify, and were the quickest wins of the game
          </p>
          <p className="imglegend">
            The Lovre, Paris <br />
            I.M Pei
          </p>
          <div className="imagecenter">
            <img src={midjourney3} alt="" />
          </div>

          <div className="blogcaptions">
            “Triangle structure with glass, pyramid, modern architecture style”
          </div>
          <p className="imglegend">
            30 St Mary Axe (The Gherkin), London
            <br />
            Norman Foster
          </p>
          <div className="imagecenter">
            <img src={midjourney4} alt="" />
          </div>

          <div className="blogcaptions">
            “United Kingdom, high rise building, diamond shaped glass facade,
            cucumber shape”
          </div>
          <p className="blogpara">
            Here are two prompts that were guessed after rounds of attempts, or
            didn’t get guessed at all-
          </p>
          <p className="imglegend">The great Wall of China, China</p>
          <div className="imagecenter">
            <img src={midjourney5} alt="" />
          </div>
          <div className="blogcaptions">
            “Long stone barricade, mountaineous setting, fortress”
          </div>
          <p className="imglegend">
            CCTV Headquarters, Beijing <br />
            Office for Metropolitan Architecture
          </p>
          <div className="imagecenter">
            <img src={midjourney6} alt="" />
          </div>
          <div className="blogcaptions">
            “Beijing, landmark glass building, large portal, square, hole in
            middle”
          </div>
          <p className="blogpara">
            There is a lot of ambiguity in how the AI bot recieved these
            prompts. Words such as barricade and fortress were a close
            substitute for wall, but failed to replace the word successfully.{" "}
            <br />
            The order of words in the promt was also important, like ‘square’
            and ‘hole in middle’ was interpreted as a hole in the centre of the
            image, not building. If they were mentioned along with or before the
            word ‘building’, perhaps the bot would have given more accurate
            results. <br /> <br /> Andrew Kudless gives an example of the
            ambiguity of language reception by the AI bot. He says, “if you
            prompt with something like “a fabric facade”, you might get a facade
            covered in fabric or a steel and glass facade that acts like
            fabric.” The ambiguity of language is an essential part of the
            creative process as we move back and forth between reality and
            metaphor.
          </p>
          <div className="blogheading">
            “Having a tool that helps explore the line between these helps a
            designer clarify their visions in both words and images”
          </div>
          <div className="blogfooter">
            <img src={line} alt="" className="blogendline" />
            <div className="author">
              <div className="authorname">Saoirse Tope</div>
              <div className="publishdate">23 SEPTEMBER 2022</div>
            </div>
            <div className="publishdate" id="footertags">
              TAGS:
            </div>
            <div className="blogtags">
              <div id="peopleandevents">People and Events </div>
              <div id="architecture">Journal</div>
            </div>
            <div className="blogsources">
              <div className="blogsourceheader">Sources</div>
              <div className="blogsourceli">
                <a
                  href="https://indianexpress.com/article/education/over-a-dozen-states-have-dropout-rate-at-secondary-level-higher-than-national-average-8173362/lite/"
                  target="_blank"
                >
                  Bridgland V, et al. (2021). Why the COVID-19 pandemic is a
                  traumatic stressor.
                </a>
              </div>
              <div className="blogsourceli">
                Fisher J. (2017). Trauma-informed stabilisation treatment: A new
                approach to treating unsafe behaviour.
              </div>
              <div className="blogsourceli">
                Nelson CA, et al. (2020). Adversity in childhood is linked to
                mental and physical health throughout life.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      {/* <section className="newsletter">
        <Newsletter/>
      </section> */}
    </>
  );
}

export default Mattermidjourney;
