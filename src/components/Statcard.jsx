const Statcard = (props) => {
  return (
    <div className="flex-1 px-6 py-5 first:pl-0 last:pr-0">
      <p
        className="text-[11px] uppercase tracking-widest mb-2"
        style={{ color: "#8B93A5"}}
      >
        {props.title}
      </p>
      <p
        className="text-4xl leading-none mb-1"
        style={{ fontFamily: "'Fraunces', serif",  }}
      >
        {props.number}
      </p>
      <p
        className="text-xs"
        style={{ color: "#8B93A5", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {props.subtitle}
      </p>
    </div>
  );
};

export default Statcard;
