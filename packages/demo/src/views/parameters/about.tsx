import { FunctionalComponent, h } from "preact";

const AboutView: FunctionalComponent = () => {
  return (
    <div class="flex flex-col items-center self-center w-full">
      <span class="text-lg">about</span>
      <div class="flex flex-col gap-y-2 md:w-full md:px-1 w-5/6 text-sm">
        <span>
          This is a demo for <a class="text-override-blue" href="https://github.com/jackhenry/babel-aas">babel-as-a-service (baas)</a>.
          When submitted, the code is sent to the baas service where it is processed and compiled by babel.
        </span>
        <span>
          I've also written a <a class="text-override-blue" href="https://github.com/jackhenry/babel-aas">webpack plugin/loader</a> that
          can be used to complete babel compilations in the cloud :)
        </span>
        <span class="self-center">
          This project is basically a meme.
        </span>
        <span class="self-center">
          <a class="text-override-blue" href="https://www.jackerickson.net">by Jack Erickson</a>
        </span>
      </div>
    </div>
  )
}

export default AboutView;