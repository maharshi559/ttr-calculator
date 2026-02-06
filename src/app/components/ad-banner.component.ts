import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  template: `
    <div class="ad-container">
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-1367828937720955"
        data-ad-slot="xxxxxxxxxx"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      ></ins>
    </div>
  `,
  styles: [
    `
      .ad-container {
        text-align: center;
        padding: 10px;
        background-color: #f5f5f5;
        margin-top: 20px;
        border-top: 1px solid #ddd;
      }
    `,
  ],
})
export class AdBannerComponent implements OnInit {
  ngOnInit() {
    // Push AdSense ads when component initializes
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }
}
