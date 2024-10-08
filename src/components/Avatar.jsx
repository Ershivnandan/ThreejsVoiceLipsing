/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/models/65a6513250377ef74b7628af.glb -o src/components/Avatar.jsx -r public 
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useGraph, useLoader } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useControls } from "leva";
import * as THREE from "three";

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

export function Avatar(props) {
  const { playAudio, script } = useControls({
    playAudio: false,
    script: {
      value: "greeting",
      options: ["greeting", "intro", "venuSir"],
    },
  });

  const audio = useMemo(() => new Audio(`/audios/${script}.mp3`), [script]);

  const jsonFile = useLoader(THREE.FileLoader, `audios/${script}.json`);
  const lipSync = JSON.parse(jsonFile);

  useFrame(() => {
    const currentAudioTime = audio.currentTime;

    if (audio.paused || audio.ended) {
      setAnimation("idle");
      nodes.Wolf3D_Head.morphTargetInfluences[
        nodes.Wolf3D_Head.morphTargetDictionary["viseme_sil"]
      ] = 0;
      nodes.Wolf3D_Teeth.morphTargetInfluences[
        nodes.Wolf3D_Teeth.morphTargetDictionary["viseme_sil"]
      ] = 0;
    }

    Object.values(corresponding).forEach((value) => {
      nodes.Wolf3D_Head.morphTargetInfluences[
        nodes.Wolf3D_Head.morphTargetDictionary[value]
      ] = 0;
      nodes.Wolf3D_Teeth.morphTargetInfluences[
        nodes.Wolf3D_Teeth.morphTargetDictionary[value]
      ] = 0;
    });

    for (let i = 0; i < lipSync.mouthCues.length; i++) {
      const mouthCues = lipSync.mouthCues[i];
      if (
        currentAudioTime >= mouthCues.start &&
        currentAudioTime <= mouthCues.end
      ) {
        nodes.Wolf3D_Head.morphTargetInfluences[
          nodes.Wolf3D_Head.morphTargetDictionary[
            corresponding[mouthCues.value]
          ]
        ] = 1;
        nodes.Wolf3D_Teeth.morphTargetInfluences[
          nodes.Wolf3D_Teeth.morphTargetDictionary[
            corresponding[mouthCues.value]
          ]
        ] = 1;
        break;
      }
    }
  });

  const { animations: angryAnimation } = useFBX("/animations/angryGesture.fbx");
  const { animations: idleAnimation } = useFBX("/animations/BreathingIdle.fbx");
  const { animations: standingAnimation } = useFBX(
    "/animations/standingGreeting.fbx"
  );
  const { animations: wavingAnimation } = useFBX("/animations/waving.fbx");
  const { animations: standingArguing } = useFBX(
    "/animations/standingArguing.fbx"
  );

  idleAnimation[0].name = "idle";
  angryAnimation[0].name = "angry";
  standingAnimation[0].name = "greeting";
  wavingAnimation[0].name = "waving";
  standingArguing[0].name = "arguing";

  const [animation, setAnimation] = useState("idle");
  const group = useRef();
  const { actions } = useAnimations(
    [
      idleAnimation[0],
      angryAnimation[0],
      standingAnimation[0],
      wavingAnimation[0],
      standingArguing[0],
    ],
    group
  );

  useEffect(() => {
    let timeout;
    let previousTime = 0;
    let animationTransitioned = false;

    const handleAnimationTransition = () => {
      if (
        wavingAnimation &&
        wavingAnimation[0] &&
        wavingAnimation[0].duration &&
        !animationTransitioned
      ) {
        timeout = setInterval(() => {
          const currentTime = audio.currentTime;
          const animationDuration = wavingAnimation[0].duration;

          if (currentTime - previousTime >= animationDuration) {
            setAnimation("arguing");
            console.log("Animation changed to arguing");
            animationTransitioned = true;
            clearInterval(timeout);
          }
        }, 100);
      }
    };

    if (playAudio) {
      audio.play();
      if (script === "greeting") {
        setAnimation("waving");
        previousTime = audio.currentTime;
      } else if (script === "venuSir") {
        setAnimation("waving");
        handleAnimationTransition();
      } else {
        setAnimation("arguing");
      }
    } else {
      setAnimation("idle");
      audio.pause();
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(timeout);
      animationTransitioned = false;
    };
  }, [playAudio, script, wavingAnimation]);

  const { scene } = useGLTF("/models/65a6513250377ef74b7628af.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();

    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/models/65a6513250377ef74b7628af.glb");
