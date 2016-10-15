/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>

#import "RCTLinkingManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"deepcheck"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  NSLog(@"%@", @"PersisteWebCookie");
  NSData *cookiesdata = [[NSUserDefaults standardUserDefaults] objectForKey:@"MySavedCookies"];
  if([cookiesdata length]) {
    NSArray *cookies = [NSKeyedUnarchiver unarchiveObjectWithData:cookiesdata];
    NSHTTPCookie *cookie;
    
    for (cookie in cookies) {
      [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];
    }
  }
  NSLog(@"%@", @"PersisteWebCookie Restored");

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
//  NSURL *url = [launchOptions valueForKey:UIApplicationLaunchOptionsURLKey];
//  if (url){
//    [[NSUserDefaults standardUserDefaults] setURL:url forKey:@"scheme"];
//    [[NSUserDefaults standardUserDefaults] synchronize];
//  }
  
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                  didFinishLaunchingWithOptions:launchOptions];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
  
//  NSURL *url = [[NSUserDefaults standardUserDefaults] URLForKey:@"scheme"];
//  if(url) {
//    [self application:application handleOpenURL:url];
//    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"scheme"];
//    [[NSUserDefaults standardUserDefaults] synchronize];
//  }
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  if([[url scheme] isEqualToString:@"deepcheck"]) {
    return [RCTLinkingManager application:application openURL:url
                        sourceApplication:sourceApplication annotation:annotation];
  } else {
    return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                          openURL:url
                                                sourceApplication:sourceApplication
                                                       annotation:annotation];
  }
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  NSLog(@"%@", @"PersisteWebCookie");
  NSArray *cookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookies];
  NSData *cookieData = [NSKeyedArchiver archivedDataWithRootObject:cookies];
  [[NSUserDefaults standardUserDefaults] setObject:cookieData forKey:@"MySavedCookies"];
  NSLog(@"%@", @"PersisteWebCookie Saved");
}

@end
