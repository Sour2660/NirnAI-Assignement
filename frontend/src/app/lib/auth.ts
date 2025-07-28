"use client";

export function setLoggedIn(v: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("loggedIn", v ? "1" : "0");
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("loggedIn") === "1";
}