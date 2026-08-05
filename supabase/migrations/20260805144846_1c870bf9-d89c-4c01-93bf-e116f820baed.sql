INSERT INTO public.portfolio_projects (title, category, description, demo_url, sort_order, is_active)
SELECT title, category, description, demo_url, sort_order, is_active
FROM (VALUES
  ('Luxe Landing Page', 'ল্যান্ডিং পেজ', 'প্রিমিয়াম সার্ভিস বা অফারের জন্য কনভার্সন-ফোকাসড ল্যান্ডিং পেজ।', '/demo/luxe-landing', 1, true),
  ('Kart+ E-commerce', 'ই-কমার্স', 'ফ্যাশন ও রিটেইল ব্র্যান্ডের জন্য দ্রুত, মোবাইল-ফার্স্ট অনলাইন স্টোর।', '/demo/kartplus-ecommerce', 2, true),
  ('FreshCart Grocery', 'গ্রোসারি', 'গ্রোসারি ও ফুড ডেলিভারি ব্যবসার জন্য প্রোডাক্ট, কার্ট ও অর্ডার ফ্লো।', '/demo/freshcart-grocery', 3, true),
  ('EduPrime LMS', 'এলএমএস', 'কোর্স, স্টুডেন্ট, কুইজ ও পেমেন্টসহ পূর্ণাঙ্গ লার্নিং প্ল্যাটফর্ম।', '/demo/eduprime-lms', 4, true),
  ('PanelPro SMM', 'এসএমএম প্যানেল', 'সার্ভিস অর্ডার, ব্যালেন্স ও API-রেডি SMM প্যানেল ওয়েবসাইট।', '/demo/panelpro-smm', 5, true),
  ('Orbit CRM', 'কাস্টম সফটওয়্যার', 'লিড, টাস্ক ও রিপোর্টিং ম্যানেজ করার জন্য কাস্টম CRM ড্যাশবোর্ড।', '/demo/orbit-crm', 6, true),
  ('PulseAds Video', 'AI ভিডিও', 'AI ভিডিও অ্যাড ও ক্যাম্পেইন প্রিভিউর জন্য ক্রিয়েটিভ ল্যান্ডিং অভিজ্ঞতা।', '/demo/pulseads-video', 7, true),
  ('BrandKit Design', 'লোগো ও পোস্টার', 'লোগো, কভার ও সোশ্যাল মিডিয়া ক্রিয়েটিভের জন্য ব্র্যান্ড কিট প্রিভিউ।', '/demo/brandkit-design', 8, true)
) AS seed(title, category, description, demo_url, sort_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.portfolio_projects);