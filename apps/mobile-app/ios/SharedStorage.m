#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SharedStorage, NSObject)
RCT_EXTERN_METHOD(setValue:(NSString *)key value:(NSString *)value)
RCT_EXTERN_METHOD(getValue:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
