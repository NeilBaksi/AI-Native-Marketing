import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Figure, FlowChain } from '../components/ui'
import { EASE_OUT_EXPO } from '../lib/motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } } }

const WORKFLOWS = ['Sense', 'Focus', 'Design', 'Attract', 'Orchestrate', 'Execute', 'Learn']

/**
 * Not a SaaS hero — no centered headline/subhead/two-buttons block. The D1
 * diagram does double duty as the course's most important recurring visual
 * and the site's primary navigation (each node will link to its Part III
 * page once those exist).
 */
export default function Home() {
  return (
    <motion.div className="pt-14 pb-10 sm:pt-20 sm:pb-14" variants={container} initial="hidden" animate="show">
      <motion.h1 variants={item} className="max-w-[16ch] text-display-xl text-ink">
        The AI-Native Marketing Handbook
      </motion.h1>
      <motion.p variants={item} className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
        A field guide to the Intelligent Marketing Operating System — for a marketer
        who's never touched AI, an engineer who's never touched marketing, or anyone
        else starting from zero.
      </motion.p>

      <motion.div variants={item} className="mt-14">
        <Figure
          d="D1"
          caption="The seven I-MOS workflows, wrapped in a continuous Govern envelope. Every chapter in Parts II and III zooms into one node of this diagram."
          alt="Seven connected stages — Sense, Focus, Design, Attract, Orchestrate, Execute, Learn — running left to right on desktop or stacked top to bottom on mobile, with Learn feeding back into Sense to close the loop. A band beneath all seven represents Govern, running underneath every stage continuously."
        >
          <FlowChain
            nodes={WORKFLOWS}
            loopBackLabel="Learn writes back to Sense — the loop compounds"
            band="GOVERN — runs beneath every workflow, continuously"
          />
        </Figure>
      </motion.div>

      <motion.nav variants={item} aria-label="Reading paths" className="mt-14">
        <h2 className="text-h3 text-ink">Three ways in</h2>
        <ul className="mt-6 flex flex-col gap-8">
          <li>
            <Link to="/start-here" className="font-display text-h4 text-ember-deep hover:underline">
              Start here
            </Link>
            <p className="mt-1 text-sm text-ink-soft">
              How to use this handbook, and three reading paths matched to your background.
            </p>
          </li>
          <li>
            <Link to="/foundations/the-problem" className="font-display text-h4 text-ember-deep hover:underline">
              Read the problem first
            </Link>
            <p className="mt-1 text-sm text-ink-soft">
              The four symptoms of a disconnected marketing operation — why this exists at all.
            </p>
          </li>
        </ul>
      </motion.nav>
    </motion.div>
  )
}
