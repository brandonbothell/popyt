import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: JSX.Element
}

const featureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    svg: require('@site/static/img/undraw_youtube.svg').default,
    description: (
      <>
        Popyt was designed from the ground up to be quick to install and
        use to download from and upload to the YouTube Data API intuitively.
      </>
    )
  },
  {
    title: 'Focus on What Matters',
    svg: require('@site/static/img/undraw_data.svg').default,
    description: (
      <>
        Popyt lets you focus on the data you want to retrieve, while it works
        behind the scenes to parse the data from the YouTube API into a easy-to-use,
        well-documented format.
      </>
    )
  },
  {
    title: 'Save Your Quota',
    svg: require('@site/static/img/undraw_cache.svg').default,
    description: (
      <>
        Don't worry about making multiple calls to functions for data. Popyt will
        automatically cache data for a specifiable amount of time.
      </>
    )
  }
]

function Feature ({ title, svg, description }: FeatureItem) {
  const SVG = svg

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <SVG className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures (): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {featureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
