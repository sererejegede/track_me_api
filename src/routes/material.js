const express = require('express');

const router = express.Router();
const Status = {
  PUBLISHED: 'PUBLISHED',
  DRAFTED: 'DRAFTED'
}
const materials = [
  {
    key: 1,
    productNumber: 'EKI 1300 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12',
    status: Status.PUBLISHED
  },
  {
    key: 2,
    productNumber: 'Eki 108 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 3,
    productNumber: 'EKI 5500 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 4,
    productNumber: 'EKI 128 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.DRAFTED
  },
  {
    key: 5,
    productNumber: 'EKI 129 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 6,
    productNumber: 'EKI 121 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5, S6, S7',
    status: Status.PUBLISHED
  },
  {
    key: 7,
    productNumber: 'EKI 250 SBR',
    category: 'SBR Rubber',
    shapes: 'S1, S3, S4, S5, S6',
    status: Status.PUBLISHED
  },
  {
    key: 8,
    productNumber: 'EKI 251 SBR',
    category: 'SBR Rubber',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 9,
    productNumber: 'EKI 252 SBR',
    category: 'SBR Rubber',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 10,
    productNumber: 'EKI 255 SBR',
    category: 'SBR Rubber',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 11,
    productNumber: 'Eki 107 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5, S6',
    status: Status.PUBLISHED
  },
  {
    key: 12,
    productNumber: 'Eki 108 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 13,
    productNumber: 'EKI 5500 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 14,
    productNumber: 'EKI 128 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.DRAFTED
  },
  {
    key: 15,
    productNumber: 'EKI 129 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 16,
    productNumber: 'EKI 121 PU',
    category: 'Polyetherschuim',
    shapes: 'S1, S2, S3, S4, S5, S6, S7',
    status: Status.PUBLISHED
  },
  {
    key: 17,
    productNumber: 'EKI 250 SBR',
    category: 'SBR Rubber',
    shapes: 'S1, S3, S4, S5, S6',
    status: Status.PUBLISHED
  },
  {
    key: 18,
    productNumber: 'EKI 251 SBR',
    category: 'SBR Rubber',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 19,
    productNumber: 'EKI 252 SBR',
    category: 'SBR Rubber',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.PUBLISHED
  },
  {
    key: 20,
    productNumber: 'EKI 255 SBR',
    category: 'SBR Rubber',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.DRAFTED
  },
  {
    key: 21,
    productNumber: 'EKI 255 SBR',
    category: 'SBR Rubber',
    shapes: 'S1, S2, S3, S4, S5',
    status: Status.DRAFTED
  }
];

const filterData = (searchTerm, data) => {
  return data.filter(
    datum =>
      datum.category
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase()) !== -1 ||
      datum.productNumber
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase()) !== -1 ||
      datum.status.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
        -1
  )
}

router.get('/material', async (req, res) => {
  let data = materials
  let pageCount = Math.ceil(data.length / 10);
  let page = parseInt(req.query.page);
  if (!page) { page = 1;}
  if (page > pageCount) {
    page = pageCount
  }
  if (req.query.query) {
    data = filterData(req.query.query, materials)
    pageCount = Math.ceil(data.length / 10);
  }
  return res.json({
    data: data.slice(page * 10 - 10, page * 10),
    pageCount,
    page,
    total: data.length
  })
});

module.exports = router;
