import Service from '../dao/models/service.model.js';

export const getServices = async (req, res) => {
    try {
        const { category, available, page = 1, limit = 10, sortBy = 'price', order = 'asc' } = req.query;

        let filter = {};
        if (category) filter.category = category;
        if (available !== undefined) filter.available = available === 'true';

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;
        const sortOrder = order === 'desc' ? -1 : 1;

        const totalDocs = await Service.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / limitNum);

        const docs = await Service.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limitNum);

        const hasPrevPage = pageNum > 1;
        const hasNextPage = pageNum < totalPages;

        return res.status(200).json({
            status: 'success',
            payload: docs,
            totalResults: totalDocs,
            totalPages,
            page: pageNum,
            limit: limitNum,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `/api/services?page=${pageNum - 1}&limit=${limitNum}` : null,
            nextLink: hasNextPage ? `/api/services?page=${pageNum + 1}&limit=${limitNum}` : null
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createService = async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        return res.status(201).json({ status: 'success', payload: newService });
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
};