import { useEffect, useState } from "react";
import { BigPlayButton, ControlBar, LoadingSpinner, PlayToggle, Player } from "video-react";
import "./videoPlayer.css"

export function VideoPlayer({
    src,
    onPlayerChange = () => {},
    onChange = () => {},
    startTime = undefined,
 }) {
    const [player, setPlayer] = useState(undefined)
    const [playerState, setPlayerState] = useState(undefined)

    useEffect(() => {
        if (playerState) {
            onChange(playerState)
        }
    }, [playerState])

    useEffect(() => {
        onPlayerChange(player)

        if (player) {
            player.subscribeToStateChange(setPlayerState)
        }
    }, [player])

    return (
        <div className={"video-player"}>
            <Player
                ref={(player) => { setPlayer(player) }}
                startTime={startTime}
                className={"player"}
            >
                <source src={src} />
                <BigPlayButton position="center" />
                <LoadingSpinner />
                <ControlBar autoHide={false} disableDefaultControls={true}>
                    <PlayToggle />
                </ControlBar>
            </Player>
        </div>
    )
 }