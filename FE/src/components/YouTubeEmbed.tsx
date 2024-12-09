import '../styles/Details.css'

const YoutubeEmbed = (props: { embedId?: string , class: string}) => {
    const embedUrl = props.embedId?.replace("watch?v=", "embed/");    return (
      <div className = {`trailer ${props.class}`}>
        <iframe
          // width={640}
          // height={360}
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="embedYt"

          // onPause={}
        />
      </div>
    );
};
  

export default YoutubeEmbed
