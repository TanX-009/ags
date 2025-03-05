#!/usr/bin/gjs -m

import "./globals";

import { Gdk, Gtk } from "astal/gtk3";
import { App } from "astal/gtk3";
import { compileScss } from "./cssHotReload";

import StatusLine from "@windows/statusline/StatusLine";
import FileExplorer from "@windows/file_explorer/FileExplorer";

import requestHandler from "./requestHandler";

function main() {
  const mainMonitor = App.get_monitors().at(0)!;
  const bars = new Map<Gdk.Monitor, Gtk.Widget>();

  FileExplorer(mainMonitor);
  for (const gdkmonitor of App.get_monitors()) {
    bars.set(gdkmonitor, StatusLine(gdkmonitor));
  }

  App.connect("monitor-added", (_, gdkmonitor) => {
    bars.set(gdkmonitor, StatusLine(gdkmonitor));
  });

  App.connect("monitor-removed", (_, gdkmonitor) => {
    bars.get(gdkmonitor)?.destroy();
    bars.delete(gdkmonitor);
  });
}

App.start({
  css: compileScss(),
  icons: `${HOME_DIR}/.config/ags/icons/`,

  requestHandler,
  main: main,
});
