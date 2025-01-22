import Foundation

@objc(SharedStorage)
class SharedStorage: NSObject {
    @objc
    func setValue(_ key: String, value: String) {
        let sharedDefaults = UserDefaults(suiteName: "group.com.aremusmog.myapp")
        sharedDefaults?.set(value, forKey: key)
    }

    @objc
    func getValue(_ key: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        let sharedDefaults = UserDefaults(suiteName: "group.com.aremusmog.myapp")
        if let value = sharedDefaults?.string(forKey: key) {
            resolver(value)
        } else {
            rejecter("not_found", "No value found for key \(key)", nil)
        }
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
