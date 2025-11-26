import React from "react";

export default function FooterComponent() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div
              className="w-full md:w-12/12 px-4 "
              style={{
                //center
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://solution.ismartvenine.com/documment/Digital%20Transformation"
                  className="text-orange-400 hover:text-orange-700 text-sm font-semibold py-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Creative by Digital Transformation Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
