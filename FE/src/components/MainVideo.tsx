import YoutubeEmbed from './YoutubeEmbed'
import '../styles/Details.css'

const MainVideo = (props: {url?: string, data}) => {
  return (
    <div>
      <YoutubeEmbed embedId={props.url} class = 'main-video'/>
    </div>
  )
}

export default MainVideo
