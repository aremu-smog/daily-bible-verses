//
//  WidgetHelper.swift
//  VerseofTheDay
//
//  Created by Aremu Oluwagbamila on 21/01/2025.
//

import Foundation
import WidgetKit

@objc(WidgetHelper)
class WidgetHelper: NSObject {
  
  // Method to reload the widget timeline
  @objc static func reloadWidget() {
    if #available(iOS 14.0, *) {
      // Reload the widget timeline for "MyWidget"
      WidgetCenter.shared.reloadTimelines(ofKind: "widget")
    } else {
      NSLog("WidgetKit is not available on this iOS version.")
    }
  }
}
