import {Todo} from '../types/todo';
import {Request, Response, NextFunction} from 'express';

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.factoryController = (Model: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const createResStatus = (
            code: number,
            status: string,
            data: any,
            result?: number
        ) => {
            return res.status(code).json({
                status: status,
                data: data,
                result: result,
            });
        };

        function sayHello() {
            console.log('hello')
        }

        return {
            sayHello,
            deleteOne: async () => {
                const doc: Todo = await Model.findByIdAndDelete(id);

                if (!doc) {
                    return next(new AppError('No document found with that ID', 404));
                }

                createResStatus(204, 'success', 'deleted');
            },
            updateOne: async () => {
                const doc: Todo = await Model.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });

                if (!doc) {
                    return next(new AppError('No document found with that ID', 404));
                }

                createResStatus(200, 'success', doc);
            },
            createOne: async () => {
                const doc: Todo = await Model.create(req.body);

                createResStatus(201, 'success', doc);
            },
            getOne: async () => {
                const doc: Todo = await Model.findById(id);

                if (!doc) {
                    return next(new AppError('No document found with that ID', 404));
                }

                createResStatus(200, 'success', doc);
            },
            getAll: async () => {
                const docs: Todo[] = await Model.find();

                createResStatus(201, 'success', docs, docs.length);
            },
        };
    });

exports.deleteOne = (Model: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(204).json('success');
    });

exports.updateOne = (Model: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json(doc);
    });

exports.createOne = (Model: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.create(req.body);

        res.status(201).json(doc);
    });

exports.getOne = (Model: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findById(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json(doc);
    });

exports.getAll = (Model: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const docs = await Model.find();
        // SEND RESPONSE
        res.status(200).json(docs);
    });
