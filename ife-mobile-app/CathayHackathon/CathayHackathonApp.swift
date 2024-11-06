//
//  CathayHackathonApp.swift
//  CathayHackathon
//
//  Created by Shannon Sie Santosa on 4/11/2024.
//

import SwiftUI
import SwiftData

@main
struct CathayHackathonApp: App {
    
   @StateObject private var vm = AppViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(vm)
                .task {
                    await vm.requestDataScannerAccess()
                }
        }
    }
}
