import Hyprland from "gi://AstalHyprland";
import Mpris from "gi://AstalMpris";

import StatusLineDivider from "@widgets/StatusLineDivider";

import { Gtk } from "astal/gtk3";
import { bind } from "astal";
import {
  EventBox,
  Scrollable,
} from "../../../../../../../../usr/share/astal/gjs/gtk3/widget";

const hyprland = Hyprland.get_default();
const spotify = Mpris.Player.new("brave.instance36292");
const player = Mpris.get_default();

export default function NormalMode() {
  return (
    <box name="normal" className="normal" spacing={8} hexpand={true}>
      <stack
        className="window_state"
        transitionType={Gtk.StackTransitionType.OVER_RIGHT_LEFT}
        transitionDuration={ANIMATION_SPEED}
        setup={(self) => {
          self.hook(hyprland, "event", () => {
            const focusedClient = hyprland.get_focused_client();
            if (!focusedClient) {
              self.set_shown("tiling");
              return;
            }

            self.set_shown(
              !focusedClient.get_floating() ? "tiling" : "floating",
            );
          });
        }}
      >
        <label name="tiling" className="tiling" label="TILING" />

        <label name="floating" className="floating" label="FLOATING" />
      </stack>

      <label
        className="decoration"
        setup={(self) => {
          self.hook(hyprland, "event", () => {
            const focusedClient = hyprland.get_focused_client();

            self.set_label(focusedClient ? focusedClient.get_title() : "~");
            //self.set_label(
            //  focusedClient ? focusedClient.get_title() + " -" : "~ -",
            //);
          });
        }}
      />

      {/*
        <label
          className="active_window"
          setup={(self) => {
            self.hook(hyprland, "event", () => {
              const focusedClient = hyprland.get_focused_client();

              self.set_label(focusedClient ? focusedClient.get_class() : "~");
            });
          }}
        />
      */}

      <StatusLineDivider />

      <EventBox
        onScroll={(self, event) => {
          console.log(event.modifier);
        }}
      >
        {bind(spotify, "available").as((musicAvailable) =>
          !musicAvailable ? (
            <label className="music_indicator" label="󰝛 No Music - Title" />
          ) : (
            <label
              className="music_indicator"
              label={bind(spotify, "title").as((title) => `󰝚 ${title}`)}
            />
          ),
        )}
      </EventBox>
    </box>
  );
}
