alter table public.gallery_items
  add constraint gallery_items_image_path_key unique (image_path);
