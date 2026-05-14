"use client";

import React from "react";
import { motion } from "framer-motion";

export const HyperSpeedLoader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#16110D]/90 backdrop-blur-md rounded-[2rem] overflow-hidden"
    >
      <style>{`
        .loader-hyper {
          position: absolute;
          top: 50%;
          margin-left: -50px;
          left: 50%;
          animation: speeder 0.4s linear infinite;
          z-index: 10;
        }

        .loader-hyper > span {
          height: 5px;
          width: 35px;
          background: #FF7A18;
          position: absolute;
          top: -19px;
          left: 60px;
          border-radius: 2px 10px 1px 0;
        }

        .base span {
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 100px solid #FF7A18;
          border-bottom: 6px solid transparent;
        }

        .base span:before {
          content: "";
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: #FF7A18;
          position: absolute;
          right: -110px;
          top: -16px;
        }

        .base span:after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 0 solid transparent;
          border-right: 55px solid #FF7A18;
          border-bottom: 16px solid transparent;
          top: -16px;
          right: -98px;
        }

        .face {
          position: absolute;
          height: 12px;
          width: 20px;
          background: #FF7A18;
          border-radius: 20px 20px 0 0;
          transform: rotate(-40deg);
          right: -125px;
          top: -15px;
        }

        .face:after {
          content: "";
          height: 12px;
          width: 12px;
          background: #FF7A18;
          right: 4px;
          top: 7px;
          position: absolute;
          transform: rotate(40deg);
          transform-origin: 50% 50%;
          border-radius: 0 0 0 2px;
        }

        .loader-hyper > span > span:nth-child(1),
        .loader-hyper > span > span:nth-child(2),
        .loader-hyper > span > span:nth-child(3),
        .loader-hyper > span > span:nth-child(4) {
          width: 30px;
          height: 1px;
          background: #FF7A18;
          position: absolute;
          animation: fazer1 0.2s linear infinite;
        }

        .loader-hyper > span > span:nth-child(2) {
          top: 3px;
          animation: fazer2 0.4s linear infinite;
        }

        .loader-hyper > span > span:nth-child(3) {
          top: 1px;
          animation: fazer3 0.4s linear infinite;
          animation-delay: -1s;
        }

        .loader-hyper > span > span:nth-child(4) {
          top: 4px;
          animation: fazer4 1s linear infinite;
          animation-delay: -1s;
        }

        @keyframes fazer1 {
          0% { left: 0; }
          100% { left: -80px; opacity: 0; }
        }
        @keyframes fazer2 {
          0% { left: 0; }
          100% { left: -100px; opacity: 0; }
        }
        @keyframes fazer3 {
          0% { left: 0; }
          100% { left: -50px; opacity: 0; }
        }
        @keyframes fazer4 {
          0% { left: 0; }
          100% { left: -150px; opacity: 0; }
        }

        @keyframes speeder {
          0% { transform: translate(2px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -3px) rotate(-1deg); }
          20% { transform: translate(-2px, 0px) rotate(1deg); }
          30% { transform: translate(1px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 3px) rotate(-1deg); }
          60% { transform: translate(-1px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-2px, -1px) rotate(1deg); }
          90% { transform: translate(2px, 1px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }

        .longfazers {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .longfazers span {
          position: absolute;
          height: 2px;
          width: 20%;
          background: #FF7A18;
          opacity: 0.2;
        }

        .longfazers span:nth-child(1) {
          top: 20%;
          animation: lf 0.6s linear infinite;
          animation-delay: -5s;
        }

        .longfazers span:nth-child(2) {
          top: 40%;
          animation: lf2 0.8s linear infinite;
          animation-delay: -1s;
        }

        .longfazers span:nth-child(3) {
          top: 60%;
          animation: lf3 0.6s linear infinite;
        }

        .longfazers span:nth-child(4) {
          top: 80%;
          animation: lf4 0.5s linear infinite;
          animation-delay: -3s;
        }

        @keyframes lf { 0% { left: 200%; } 100% { left: -200%; opacity: 0; } }
        @keyframes lf2 { 0% { left: 200%; } 100% { left: -200%; opacity: 0; } }
        @keyframes lf3 { 0% { left: 200%; } 100% { left: -100%; opacity: 0; } }
        @keyframes lf4 { 0% { left: 200%; } 100% { left: -100%; opacity: 0; } }

        @keyframes progress-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      {/* Long Fazers Background */}
      <div className="longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Loader Component Container */}
      <div className="relative w-full h-[150px] flex items-center justify-center -mt-12">
        <div className="loader-hyper">
          <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="base">
            <span></span>
            <div className="face"></div>
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="z-20 text-center mt-4 space-y-4">
        <h3 className="text-xl md:text-2xl font-bold tracking-widest text-[#FF7A18] uppercase animate-pulse">
          Transmitting
        </h3>
        <p className="text-white/50 font-light tracking-widest uppercase text-xs">
          Establishing connection
        </p>

        {/* Progress Bar Mockup */}
        <div className="w-48 h-[2px] bg-white/10 mx-auto mt-6 overflow-hidden relative">
          <div className="h-full bg-[#FF7A18] w-1/3 animate-[progress-bar_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </motion.div>
  );
};
