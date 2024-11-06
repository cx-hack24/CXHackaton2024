import SwiftUI
import VisionKit

extension Color {
    static let cathayGreen = Color(red: 0 / 255, green: 101 / 255, blue: 100 / 255)
    static let cathayBlue = Color(red: 0 / 255, green: 59 / 255, blue: 92 / 255)
    static let cathayPink = Color(red: 125 / 255, green: 24 / 255, blue: 62 / 255)
    static let cathaySkyBlue = Color(red: 38 / 255, green: 50 / 255, blue: 55 / 255)
}

struct ContentView: View {
    @EnvironmentObject var vm: AppViewModel
    @State private var showScanner: Bool = false
    
    //  fetching data
    @State private var userData: [String: Any] = [:]
    @State private var isLoading = false
    @State private var errorMessage: String?

    var body: some View {
        NavigationView {
            VStack {
                homeScreen
            }
            .navigationTitle("Home")
            .navigationBarHidden(true)
            .fullScreenCover(isPresented: $showScanner) {
                ScannerView(userData: $userData, showScanner: $showScanner)
            }
            .background(.clear)
        }
    }
    
    private var homeScreen: some View {
        VStack(alignment: .center) {
            Image("logoGreen")
               .resizable()
               .scaledToFit()
               .frame(width: 50, height: 50)
               .padding(.top, 30)
               .padding(.bottom, 10)
            
            Text("Welcome to \n SmartFlight App")
                .multilineTextAlignment(.center)
                .font(.custom("Poppins", size: 28).bold())
            
            Text("Select the type of user to continue...")
                .multilineTextAlignment(.center)
                .opacity(0.6)
                .font(.custom("Poppins", size: 18))
    
            
            Spacer()
            
            VStack{
                HStack{
                    Button(action: {
                        fetchData(userId: "1")
                        showScanner = true
                    }) {
                        VStack{
                            Text("👨🏻‍🦱").font(.custom("Poppins", size: 50))
                            Text("User 1")
                                .font(.custom("Poppins", size: 18).bold())
                                .foregroundColor(.white)
                            Text("Sean Michael")
                                .font(.custom("Poppins", size: 14))
                                .foregroundColor(.white)
                            
                        }
                        .frame(maxWidth: .infinity, maxHeight: 200)
                        .background(Color.cathaySkyBlue)
                        .cornerRadius(16)
                    }
                    
                    Button(action: {
                        fetchData(userId: "2")
                        showScanner = true
                    }) {
                        VStack{
                            Text("🧔🏻‍♂️").font(.custom("Poppins", size: 50))
                            Text("User 2")
                                .font(.custom("Poppins", size: 18).bold())
                                .foregroundColor(.white)
                            Text("Rhenald Louwos")
                                .font(.custom("Poppins", size: 14))
                                .foregroundColor(.white)
                            
                        }
                        .frame(maxWidth: .infinity, maxHeight: 200)
                        .background(Color.cathayGreen)
                        .cornerRadius(16)
                    }
                }.padding(.horizontal)
                
                HStack{
                    Button(action: {
                        fetchData(userId: "3")
                        showScanner = true
                    }) {
                        VStack{
                            Text("👨🏻").font(.custom("Poppins", size: 50))
                            Text("User 3")
                                .font(.custom("Poppins", size: 18).bold())
                                .foregroundColor(.white)
                            Text("Ananda Indra")
                                .font(.custom("Poppins", size: 14))
                                .foregroundColor(.white)
                            
                        }
                        .frame(maxWidth: .infinity, maxHeight: 200)
                        .background(Color.cathayBlue)
                        .cornerRadius(16)
                    }
                    
                    Button(action: {
                        fetchData(userId: "4")
                        showScanner = true
                    }) {
                        VStack{
                            Text("👩🏻‍🦰").font(.custom("Poppins", size: 50))
                            Text("User 4")
                                .font(.custom("Poppins", size: 18).bold())
                                .foregroundColor(.white)
                            Text("Shannon Sie")
                                .font(.custom("Poppins", size: 14))
                                .foregroundColor(.white)
                            
                        }
                        .frame(maxWidth: .infinity, maxHeight: 200)
                        .background(Color.cathayPink)
                        .cornerRadius(16)
                    }
                }
                .padding(.horizontal)
            }
           
            Spacer()
        }
    }
    
    private func fetchData(userId: String) {
        print("fetch data entered ==== ")
        isLoading = true
        errorMessage = nil

        guard let url = URL(string: "http://a73c4541adfe84ab3abb0d743bdea25b-471154244.ap-southeast-1.elb.amazonaws.com/recommendations?userId=\(userId)") else {
            errorMessage = "Invalid URL"
            isLoading = false
            return
        }

        let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
            if let error = error {
                DispatchQueue.main.async {
                    self.errorMessage = error.localizedDescription
                    self.isLoading = false
                    print("Error: \(error.localizedDescription)")
                }
                return
            }

            guard let data = data else {
                DispatchQueue.main.async {
                    self.errorMessage = "No data received"
                    self.isLoading = false
                    print("No data received")
                }
                return
            }

            do {
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                    DispatchQueue.main.async {
                        self.userData = json
                        self.isLoading = false
                        print("fetch data finish ==== ", self.userData)
                    }
                } else {
                    DispatchQueue.main.async {
                        self.errorMessage = "Invalid JSON format"
                        self.isLoading = false
                    }
                }
            } catch {
                DispatchQueue.main.async {
                    self.errorMessage = "Failed to parse JSON"
                    self.isLoading = false
                    print("Parsing error: \(error.localizedDescription)")
                }
            }
        }
        task.resume()
        print("fetch data finish 2 ==== ", self.userData)
    }
}

struct ScannerView: View {
    @EnvironmentObject var vm: AppViewModel
    @Environment(\.presentationMode) var presentationMode
    @Binding var userData: [String: Any]
    @Binding var showScanner: Bool
    
    @State private var seatIdEnter: String = ""
    let date: String = "Mon, 21 Oct 2024"
    let flightNo: String = "CX777"
    let origin: String = "HKG"
    let destination: String = "CGK"
    @State private var showSuccessScreen: Bool = false
    
    let seatId: String = "LAX25A"
    
    var body: some View {
        VStack {
            VStack {
                DataScannerView(recognizedItems: $vm.recognizedItems, dataType: vm.recognizedDataType, multipleItem: vm.recognizedMultipleItems)
                    .background { Color.gray.opacity(0.3) }
                    .ignoresSafeArea()
                    .id(vm.dataScannerViewId)
                    .onChange(of: vm.scanType) { _ in vm.recognizedItems = [] }
                    .onChange(of: vm.textContentType) { _ in vm.recognizedItems = [] }
                    .onChange(of: vm.recognizedMultipleItems) { _ in vm.recognizedItems = [] }
            }
            bottomContainerView
                .background(Color.clear)
                .padding()
                .fullScreenCover(isPresented: $showSuccessScreen) {
                    SuccessView(showScanner: $showScanner, showSuccessScreen: $showSuccessScreen)
                        .onDisappear {
                            presentationMode.wrappedValue.dismiss()
                        }
               
                }
        }
    }
    
    private var bottomContainerView: some View {
        VStack {
            headerView
      
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 16) {
                    ForEach(vm.recognizedItems) { count in
                        switch count {
                        case .barcode(let barcode):
                            Text(barcode.payloadStringValue ?? "Unknown Barcode")
                        case .text(let text):
                            Text(text.transcript)
                        @unknown default:
                            Text("Unknown")
                        }
                    }
                }.padding()
            }
        }.padding()
    }

    private var headerView: some View {
        VStack(alignment: .leading) {
            HStack {
                VStack(alignment: .leading) {
                    Text("\(date) | \(flightNo)")
                        .font(.custom("Poppins", size: 14))
                    HStack {
                        VStack(alignment: .leading) {
                            Text(origin)
                                .font(.custom("Poppins", size: 40).bold())
                            Text("Hong Kong")
                                .font(.custom("Poppins", size: 14))
                        }
                        Spacer()
                        Image(systemName: "airplane").font(.largeTitle)
                        Spacer()
                        Spacer()
                        VStack(alignment: .trailing) {
                            Text(destination)
                                .font(.custom("Poppins", size: 40).bold())
                            Text("Jakarta, Indonesia")
                                .font(.custom("Poppins", size: 14))
                        }
                    }
                }
            }
            HStack {
                Picker("Scan Type", selection: $vm.scanType) {
                    Text("Scan Code")
                        .tag(ScanType.barcode)
                        .font(.custom("Poppins", size: 14))
                    Text("Enter Code")
                        .tag(ScanType.text)
                        .font(.custom("Poppins", size: 14))
                }
                .pickerStyle(.segmented)
            }
            if vm.scanType != .text {
                Button(action: {
                       print("Recognized Items: \(vm.recognizedItems)")
                       for item in vm.recognizedItems {
                           if let data = extractData(from: item) {
                               sendDataToBackend(data: self.userData, seatId: "124A")
                           }
                       }
                   }) {
                       ZStack {
                           RoundedRectangle(cornerRadius: 16)
                               .fill(vm.recognizedItems.isEmpty ? Color.gray : Color.cathayGreen)
                               .frame(height: 50)
                           Text("Submit")
                               .font(.custom("Poppins", size: 18).bold())
                               .foregroundColor(.white)
                       }
                       .padding(.top)
                   }
                   .disabled(vm.recognizedItems.isEmpty) // Disable button if no items are recognized
               }
            
            if vm.scanType == .text {
                inputText
            }
        }
    }
    
    private func extractData(from item: RecognizedItem) -> String? {
       switch item {
       case .barcode(let barcode):
           return barcode.payloadStringValue
       case .text(let text):
           return text.transcript
       @unknown default:
           return nil
       }
   }
    
    private var inputText: some View {
        VStack {
            VStack {
                VStack(alignment: .leading) {
                    Text("Seat ID")
                        .foregroundColor(.cathayGreen)
                        .font(.custom("Poppins", size: 16).bold())
                    HStack {
                        TextField("E.g. 12456A", text: $seatIdEnter)
                        Button(action: {
                            print("Seat ID Submitted: \(seatId)")
                            sendDataToBackend(data: self.userData, seatId: seatIdEnter)
                        }) {
                            ZStack {
                                Circle()
                                    .fill(Color.cathayGreen)
                                    .frame(width: 50, height: 50)
                                Image(systemName: "checkmark")
                                    .font(.system(size: 24))
                                    .foregroundColor(.white)
                            }
                        }
                    }
                    .padding(.top, 4)
                    .textFieldStyle(PlainTextFieldStyle())
                    .font(.custom("Poppins", size: 28).bold())
                }
                .padding(20)
                .background(Color.white)
                .cornerRadius(10)
                .shadow(radius: 2)
            }
            .padding(.top)
        }
    }
    
    private func sendDataToBackend(data: [String: Any], seatId: String) {
        print("entereddd ======== ", data)
        guard let url = URL(string: "http://a0eb4493f3aeb48dc99786a3b979009f-1295882383.ap-southeast-1.elb.amazonaws.com/ife/recommendation/\(seatId)") else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = data
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body, options: [])
        } catch {
            print("Failed to serialize JSON: \(error)")
            return
        }
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error sending data to backend: \(error)")
                return
            }
            
            if let response = response as? HTTPURLResponse, response.statusCode == 200 {
                print("Data successfully sent to backend")
                DispatchQueue.main.async {
                    showSuccessScreen = true
                }
            } else {
                print("Failed to send data to backend")
            }
        }.resume()
    }
}

struct SuccessView: View {
    @Binding var showScanner: Bool
    @Binding var showSuccessScreen: Bool
    @State private var isAnimating = false
    
    var body: some View {
        VStack(alignment: .center) {
            Image("cathayLogo")
               .resizable()
               .scaledToFit()
               .frame(width: 50, height: 50)
               .padding(.top, 80)
               .padding(.bottom, 60)

            Image(systemName: "checkmark.circle.fill")
                            .resizable()
                            .scaledToFit()
                            .foregroundColor(Color.white)
                            .frame(width: 150, height: 150)
                            .scaleEffect(isAnimating ? 1.2 : 0.9)
                            .animation(.easeInOut(duration: 1.5).repeatCount(10, autoreverses: true), value: isAnimating)
                            .onAppear {
                                isAnimating = true
                            }
                            .padding(.bottom)
            
            VStack {
                Text("You're All Set! \n Connection Established.")
                    .foregroundStyle(.white)
                    .multilineTextAlignment(.center)
                    .font(.custom("Poppins", size: 22).bold())
                Text("Fly with Cathay and discover a world of \n entertainment designed for unique tastes!")
                    .foregroundStyle(.white)
                    .multilineTextAlignment(.center)
                    .font(.custom("Poppins", size: 12))
            }.padding()
            
            Spacer(minLength: 60)
            
            
            VStack(alignment: .center) {
                VStack(alignment: .leading) {
                    VStack {
                        VStack(alignment: .center) {
                            Text("November 6, 2024 | CX777")
                                .font(.custom("Poppins", size: 16))
                                .bold()
                                .foregroundColor(.gray)
                        }
                        
                        HStack {
                            VStack(alignment: .leading) {
                                Text("Hong Kong")
                                    .font(.custom("Poppins", size: 20)).bold()
                            }.foregroundColor(.cathayGreen)
                            
                            Text("to").font(.custom("Poppins", size: 14)).bold()
                            
                            VStack(alignment: .leading) {
                                Text("Jakarta")
                                    .font(.custom("Poppins", size: 20)).bold()
                            }.foregroundColor(.cathayGreen)
                        }
                    }
                }
                .frame(maxWidth: .infinity)
                .padding(.top, 20)
                .padding(.horizontal)

                Spacer(minLength: 5)

                Text("25A")
                    .font(.custom("Poppins", size: 60))
                    .bold()
                    .multilineTextAlignment(.center)
                    .foregroundColor(.cathayGreen)

                Spacer(minLength: 5)

                VStack {
                    Button("Close") {
                        showScanner = false
                        showSuccessScreen = false
                    }
                    .font(.custom("Poppins", size: 18))
                    .padding(.vertical)
                    .padding(.horizontal, 120)
                    .bold()
                    .background(Color.cathayGreen)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                    .padding(.bottom, 10)
                }
            }
            .background(Color.white)
            .cornerRadius(12)
        }
        .padding()
        .padding(.bottom, 50)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .edgesIgnoringSafeArea(.all)
        .padding()
   
        .background(Color.cathayGreen)
  
    }
 
}

#Preview{
    ContentView()
}
    



