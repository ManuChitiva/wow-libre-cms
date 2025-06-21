import { webProps } from "@/constants/configs";

const DiscordWidget = () => {
  return (
    <div className="flex justify-center px-4">
      <iframe
        src={webProps.discordWidget}
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        title="Discord Widget"
        className="w-full max-w-[550px] h-[400px] sm:h-[500px] rounded-md shadow-md"
      ></iframe>
    </div>
  );
};

export default DiscordWidget;
