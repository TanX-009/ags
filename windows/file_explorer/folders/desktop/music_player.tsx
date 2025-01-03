import Mpris from "gi://AstalMpris";
import { FType, Tree } from "@windows/file_explorer/utils";
import { bind } from "astal";

const player = Mpris.Player.new("");

const musicPlayer: Tree = {
  type: FType.DIR,
  name: "music_player",
  children: [
    {
      type: FType.WIDGET,
      name: "title",
      icon: "󰲹",
      widget: (
        <label
          label={bind(player, "title").as((title) => title ?? "No Music")}
          maxWidthChars={16}
          truncate={true}
        />
      ),
    },
    {
      type: FType.WIDGET,
      name: "artist",
      icon: "󰠃",
      widget: (
        <label
          label={bind(player, "artist").as((artist) => artist ?? "Artist")}
          maxWidthChars={16}
          truncate={true}
        />
      ),
    },
    {
      type: FType.WIDGET,
      name: "album",
      icon: "󰀥",
      widget: (
        <label
          label={bind(player, "album").as((album) => album ?? "Album")}
          maxWidthChars={16}
          truncate={true}
        />
      ),
    },
    {
      type: FType.WIDGET,
      name: "controls",
      icon: "",
      widget: (
        <box className="music_controls" spacing={8}>
          <button cursor="pointer" onClick={() => player.previous()}>
            <label label="󰒮" />
          </button>

          <button cursor="pointer" onClick={() => player.play_pause()}>
            <label
              label={bind(player, "playbackStatus").as((status) =>
                status === Mpris.PlaybackStatus.STOPPED
                  ? "󰓛"
                  : status === Mpris.PlaybackStatus.PLAYING
                    ? "󰏤"
                    : "󰐊",
              )}
            />
          </button>

          <button cursor="pointer" onClick={() => player.next()}>
            <label label="󰒭" />
          </button>
        </box>
      ),
    },
  ],
};

export default musicPlayer;
