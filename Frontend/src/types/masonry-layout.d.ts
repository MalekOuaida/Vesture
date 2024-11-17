declare module 'masonry-layout' {
    interface MasonryOptions {
      itemSelector?: string;
      columnWidth?: string | Element;
      percentPosition?: boolean;
      gutter?: number | string;
    }
  
    class Masonry {
      constructor(element: string | Element, options?: MasonryOptions);
      layout(): void;
      destroy(): void;
    }
  
    export default Masonry;
  }
  