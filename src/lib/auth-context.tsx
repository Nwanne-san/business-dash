"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  keepLoggedIn: boolean
  login: (email: string, keepLoggedIn: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated")
    const storedKeepLoggedIn = localStorage.getItem("keepLoggedIn")

    if (storedAuth === "true") {
      setIsAuthenticated(true)
      setKeepLoggedIn(storedKeepLoggedIn === "true")
    }
  }, [])

  const login = (email: string, keepLoggedIn: boolean) => {
    setIsAuthenticated(true)
    setKeepLoggedIn(keepLoggedIn)

    // Store authentication state
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("keepLoggedIn", keepLoggedIn ? "true" : "false")
    localStorage.setItem("userEmail", email)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setKeepLoggedIn(false)

    // Clear authentication state
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("keepLoggedIn")
    localStorage.removeItem("userEmail")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, keepLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

