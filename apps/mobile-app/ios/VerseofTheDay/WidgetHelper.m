#import <Foundation/Foundation.h>
#import <WidgetKit/WidgetKit.h>
#import <React/RCTBridgeModule.h>

@interface WidgetHelper : NSObject <RCTBridgeModule>
@end

@implementation WidgetHelper

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(reloadWidget) {
  if (@available(iOS 14.0, *)) {
    [WidgetCenter.sharedWidgetCenter reloadTimelinesOfKind:@"widget"]; // Ensure "widget" matches your widget identifier
  } else {
    NSLog(@"Widget refresh is not supported on this iOS version.");
  }
}

@end
