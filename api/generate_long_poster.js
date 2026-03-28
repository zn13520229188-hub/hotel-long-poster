module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const baseUrl = `${proto}://${host}`;

  const body = req.body || {};
  const hotelName = body.hotel_name || '示例酒店';
  const city = body.city || '北京';
  const style = body.style || '中高端商务';
  const points = Array.isArray(body.selling_points) && body.selling_points.length
    ? body.selling_points
    : ['地段便利', '睡眠舒适', '干净卫生', '服务稳妥', '早餐丰富', '商旅友好'];

  const sections = [
    { section_no: 1, title: `${hotelName}`, short_copy: `${city}${style}酒店亮点长图示例` },
    { section_no: 2, title: '地段交通', short_copy: points[0] || '地段便利' },
    { section_no: 3, title: '客房睡眠', short_copy: points[1] || '睡眠舒适' },
    { section_no: 4, title: '卫生服务', short_copy: points[2] || '干净卫生' },
    { section_no: 5, title: '早餐配套', short_copy: points[3] || '服务稳妥' },
    { section_no: 6, title: '适合入住人群', short_copy: points[4] || '商旅友好' }
  ];

  return res.status(200).json({
    success: true,
    poster_url: `${baseUrl}/demo-poster.png`,
    preview_url: `${baseUrl}/demo-poster.png`,
    sections
  });
};
