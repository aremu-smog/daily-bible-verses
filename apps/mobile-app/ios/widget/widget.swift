//
//  widget.swift
//  widget
//
//  Created by Aremu Oluwagbamila on 21/01/2025.
//

import WidgetKit
import SwiftUI

struct Provider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(date: Date(), bibleVerse: "Placeholder verse", bibleReference: "Galatians 6:9")
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> SimpleEntry {
      SimpleEntry(date: Date(), bibleVerse: "The Lord is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.", bibleReference: "Psalm 28:7")
    }
    
    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<SimpleEntry> {
  

        let sharedDefaults = UserDefaults(suiteName: "group.com.aremusmog.myapp")
         let bibleVerse = sharedDefaults?.string(forKey: "bibleVerse") ?? "And let us not be weary in our well doing for in due season we shall reap if we faint not"
      let bibleReference = sharedDefaults?.string(forKey: "bibleReference") ?? "Galations 6:9"

      let currentDate = Date()
      let appEntry = SimpleEntry(date: currentDate, bibleVerse: bibleVerse, bibleReference: bibleReference)

        return Timeline(entries: [appEntry], policy: .atEnd)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let bibleVerse: String
    let bibleReference: String
}

struct widgetEntryView : View {
    var entry: Provider.Entry
  

    var body: some View {
        VStack {
          Text(entry.bibleVerse).frame(maxWidth: .infinity, alignment: .center).multilineTextAlignment(.center).lineLimit(nil)
          Text(entry.bibleReference).frame(maxWidth: .infinity, alignment: .center).font(.footnote).textCase(.uppercase)
        }
    }
}

struct widget: Widget {
    let kind: String = "widget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(kind: kind, provider: Provider()) { entry in
            widgetEntryView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
        }
    }
}


#Preview(as: .systemSmall) {
    widget()
} timeline: {
    SimpleEntry(date: .now, bibleVerse: "Preview Verse 1", bibleReference: "Test")
    SimpleEntry(date: .now, bibleVerse: "Preview Verse 2", bibleReference: "Test")
}
