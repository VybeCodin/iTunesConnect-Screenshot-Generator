"use client";

import Link from "next/link";
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Download,
  Monitor,
  Smartphone,
  Tablet,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/stores/editor-store";
import { DEVICES } from "@/lib/constants/devices";
import type { DeviceType } from "@/types/device";

interface ToolbarProps {
  onExport: () => void;
}

export function Toolbar({ onExport }: ToolbarProps) {
  const {
    deviceType,
    setDeviceType,
    zoom,
    setZoom,
    undo,
    redo,
    canUndo,
    canRedo,
    showDeviceFrame,
    toggleDeviceFrame,
  } = useEditorStore();

  const currentDevice = DEVICES[deviceType];

  const deviceIcon = (type: DeviceType) => {
    if (type.startsWith("ipad") || type.includes("tablet")) return Tablet;
    return Smartphone;
  };

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="flex h-12 items-center justify-between border-b border-border/50 bg-card/80 px-3 backdrop-blur-sm">
      {/* Left: Logo + Undo/Redo */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="mr-2 flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-blue-500"
        >
          <span className="text-xs font-bold text-white">S</span>
        </Link>

        <Separator orientation="vertical" className="h-6" />

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={undo}
              disabled={!canUndo()}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={redo}
              disabled={!canRedo()}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
        </Tooltip>
      </div>

      {/* Center: Device selector */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm" className="h-8 gap-2">
              {(() => {
                const Icon = deviceIcon(deviceType);
                return <Icon className="h-4 w-4" />;
              })()}
              <span className="hidden sm:inline">{currentDevice.name}</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem className="text-xs font-semibold text-muted-foreground" disabled>
              iOS Devices
            </DropdownMenuItem>
            {Object.values(DEVICES)
              .filter((d) => d.platform === "ios")
              .map((device) => (
                <DropdownMenuItem
                  key={device.id}
                  onClick={() => setDeviceType(device.id)}
                  className={deviceType === device.id ? "bg-accent" : ""}
                >
                  {device.name}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {device.width}x{device.height}
                  </span>
                </DropdownMenuItem>
              ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs font-semibold text-muted-foreground" disabled>
              Android Devices
            </DropdownMenuItem>
            {Object.values(DEVICES)
              .filter((d) => d.platform === "android")
              .map((device) => (
                <DropdownMenuItem
                  key={device.id}
                  onClick={() => setDeviceType(device.id)}
                  className={deviceType === device.id ? "bg-accent" : ""}
                >
                  {device.name}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {device.width}x{device.height}
                  </span>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant={showDeviceFrame ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={toggleDeviceFrame}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle device frame</TooltipContent>
        </Tooltip>
      </div>

      {/* Right: Zoom + Export */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom(zoom - 0.1)}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom out</TooltipContent>
        </Tooltip>

        <span className="w-12 text-center text-xs text-muted-foreground">
          {zoomPercent}%
        </span>

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom(zoom + 0.1)}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom in</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />

        <Button
          size="sm"
          className="h-8 gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
          onClick={onExport}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
    </div>
  );
}
