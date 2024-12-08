import '../styles/Details.css'

const YouTubeEmbed = (props: { embedId: string }) => {
    const embedUrl = props.embedId.replace("watch?v=", "embed/");    return (
      <div className = 'trailer'>
        <iframe
          width={640}
          height={360}
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="embedYt"
        />
      </div>
    );
  };
  

export default YouTubeEmbed
