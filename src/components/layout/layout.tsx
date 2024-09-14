import { PropsWithChildren } from "react";
import Header from "./header/Header";

export default function Layout(props:PropsWithChildren){
    return <main className="h-screen  pl-0 lg:!pt-[var(--header-height-lg)] pt-[var(--header-height)] transition-all w-full flex">
    <div id="header" className="block fixed top-0 left-0  w-full transition-all !z-[800]">
      <Header></Header>
    </div>
    <div className="w-full h-full">
      {props.children}
    </div>
  </main>
}