angular.module('main')
.controller('IconViewController', [
    '$scope', '$location', '$uibModal', '$uibModalInstance', 'IconService', 'icon',
    function ($scope, $location, $uibModal, $uibModalInstance, IconService, icon) {

        $scope.icon = {
            id: icon.id,
            name: icon.name,
            mdiName: icon.mdiName,
            description: '...',
            data: icon.data,
            tags: [],
            comments: [],
            commentCount: 0,
            hasComments: false,
            aliases: icon.aliases,
            user: {
                name: icon.user.name,
                email: null,
                twitter: '...',
                isAuthor: false
            }
        };

        $scope.ae = {
            name: icon.name,
            size: 24,
            radius: 0,
            padding: 0,
            sizeMax: 256,
            radiusMax: 12,
            paddingMax: 128,
            sizePadding: 24,
            offsetIcon: 0,
            foregroundColor: {
                hex: '#FFFFFF'
            },
            foregroundOpacity: 1,
            backgroundColor: {
                hex: '#000000'
            },
            backgroundOpacity: 0,
            previewClass: 'preview-black'
        };
        var resize = function () {
            $scope.ae.sizePadding = parseInt($scope.ae.size)
              + 2 * parseInt($scope.ae.padding);
            $scope.ae.offset = Math.floor((256 - $scope.ae.sizePadding) / 2);
            $scope.ae.offsetIcon = $scope.ae.offset + parseInt($scope.ae.padding);
            $scope.ae.radiusMax = Math.ceil($scope.ae.sizePadding / 2);
            if (parseInt($scope.ae.radius) > $scope.ae.radiusMax) {
                $scope.ae.radius = $scope.ae.radiusMax;
            }
        };
        $scope.$watch('ae.size', function () {
            resize();
            $scope.ae.paddingMax = 128 - Math.ceil(parseInt($scope.ae.size) / 2);
            if (parseInt($scope.ae.padding) > $scope.ae.paddingMax) {
                $scope.ae.padding = $scope.ae.paddingMax;
            }
        });
        $scope.$watch('ae.padding', function () {
            resize();
        });
        var perceivedBrightness = function (c)
        {
            return Math.sqrt(
                c.r * c.r * .299 +
                c.g * c.g * .587 +
                c.b * c.b * .114);
        }
        var contrastArea = function () {
            if (!("r" in $scope.ae.foregroundColor)) { return; }
            if ($scope.ae.backgroundOpacity > 0.3) {
                $scope.ae.previewClass = perceivedBrightness($scope.ae.backgroundColor) > 130 ? 'preview-black' : 'preview-white';
            } else {
                $scope.ae.previewClass = perceivedBrightness($scope.ae.foregroundColor) > 130 ? 'preview-black' : 'preview-white';
            }
        }
        $scope.$watch('ae.foregroundColor', contrastArea);
        $scope.$watch('ae.backgroundColor', contrastArea);
        $scope.$watch('ae.foregroundOpacity', contrastArea);
        $scope.$watch('ae.backgroundOpacity', contrastArea);

        var promise = IconService.getIcon(icon.id);
        promise.then(function (data) {
            $scope.icon.user.isAuthor = data.isAuthor;
            $scope.icon.description = data.description;
            $scope.icon.user.twitter = data.user.twitter;
            $scope.icon.user.email = data.user.email || null; // Admin only
            for (var i = 0, c = data.comments.length; i < c; i++) {
                $scope.icon.comments.push({
                    name: data.comments[i].name,
                    date: data.comments[i].date,
                    twitter: data.comments[i].twitter,
                    email: data.comments[i].email || '',
                    text: $sce.trustAsHtml('<p>' + data.comments[i].text.split(/\r?\n/).join('</p><p>') + '</p>'),
                    isAuthor: data.comments[i].isAuthor
                });
            }
            $scope.icon.tags = data.tags;
            $scope.icon.commentCount = data.comments.length;
            $scope.icon.hasComments = data.comments.length > 0;
            ga('send', {
                'hitType': 'event',          // Required.
                'eventCategory': 'icon',     // Required.
                'eventAction': 'preview',    // Required.
                'eventLabel': icon.name
            });
        }, function () {
            // Handle Error
        });

        $scope.permalink = function (name) {
            $location.url('icon/' + name);
        };

        $scope.goToTag = function (tagText) {
            $location.url('/tag/' + tagText.replace(' ', '-'));
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.downloadForm = {
            isCollapsed: false,
            foreground: {
                hex: '#000000',
                opacity: 1.00
            },
            background: {
                hex: '#FFFFFF',
                opacity: 0.00
            },
            size: ''
        };

        $scope.download = {
            customized: function () {
                var url = '/api/download/' + $scope.icon.id
                                + '/' + $scope.downloadForm.foreground.hex.substring(1)
                                + '/' + $scope.downloadForm.foreground.opacity
                                + '/' + $scope.downloadForm.background.hex.substring(1)
                                + '/' + $scope.downloadForm.background.opacity;
                if ($scope.downloadForm.size != '' && parseInt($scope.downloadForm.size) < 1024) {
                    url += '/' + parseInt($scope.downloadForm.size);
                } else {
                    $scope.downloadForm.size = '24';
                }
                window.location = url;
            },
            iconPackage: function (pack) {
                window.location = '/api/download/package/' + $scope.icon.id + '/' + pack;
                ga('send', {
                    'hitType': 'event',           // Required.
                    'eventCategory': 'download',  // Required.
                    'eventAction': pack,          // Required.
                    'eventLabel': $scope.icon.name
                });
            },
            png: function (size, foreground) {
                var url = '/api/download/' + $scope.icon.id
                                + '/' + foreground
                                + '/' + 1
                                + '/' + 'FFFFFF'
                                + '/' + 0
                                + '/' + size;
                window.location = url;
            },
            svg: function () {
                window.location = '/api/download/icon/svg/' + $scope.icon.id;
            },
            svgWebfont: function () {
                window.location = '/api/download/icon/svgwebfont/' + $scope.icon.id;
            },
            xaml: function () {
                window.location = '/api/download/icon/xaml/' + $scope.icon.id;
            },
            vectorDrawable: function () {
                window.location = '/api/download/icon/vectordrawable/' + $scope.icon.id;
            },
            pngCustom: function () {
                var url = '/api/download/icon/png/{id}/{size}/{foregroundColor}/{foregroundOpacity}/{backgroundColor}/{backgroundOpacity}/{radius}/{padding}/{name}';
                url = url.replace('{id}', $scope.icon.id);
                url = url.replace('{size}', $scope.ae.size);
                url = url.replace('{foregroundColor}', $scope.ae.foregroundColor.hex.replace('#', ''));
                url = url.replace('{foregroundOpacity}', $scope.ae.foregroundOpacity);
                url = url.replace('{backgroundColor}', $scope.ae.backgroundColor.hex.replace('#', ''));
                url = url.replace('{backgroundOpacity}', $scope.ae.backgroundOpacity);
                url = url.replace('{radius}', $scope.ae.radius);
                url = url.replace('{padding}', $scope.ae.padding);
                url = url.replace('{name}', $scope.ae.name);
                window.location = url;
            }
        };

        $scope.view = {
            vectorDrawable: function () {
                $uibModal.open({
                    templateUrl: 'drawableViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $scope.icon;
                        }
                    }
                });
            },
            svg: function () {
                $uibModal.open({
                    templateUrl: 'svgViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $scope.icon;
                        }
                    }
                });
            },
            xaml: function () {
                $uibModal.open({
                    templateUrl: 'xamlViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $scope.icon;
                        }
                    }
                });
            },
            xamlDrawImage: function () {
                $uibModal.open({
                    templateUrl: 'xamlDrawImageViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $scope.icon;
                        }
                    }
                });
            }
        };

        $uibModalInstance.opened.then(function () {
           
        });

        $scope.previewDownloadMenu = [
            ['Coming Soon...', function ($itemScope) {
                //window.location = '/api/download/icon/png/' + $scope.icon.id;
            }]
        ];

        $scope.downloadThumbnail24 = [
            ['Download .PNG 24x24', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $scope.icon.id;
            }],
            null,
            ['Download .PNG 36x36', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $scope.icon.id + '/36';
            }],
            ['Download .PNG 48x48', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $scope.icon.id + '/48';
            }],
            ['Download .SVG Compressed', function ($itemScope) {
                window.location = '/api/download/icon/svg/' + $scope.icon.id;
            }],
            ['Download .SVG Webfont', function ($itemScope) {
                window.location = '/api/download/icon/svgwebfont/' + $scope.icon.id;
            }],
            ['Download .XAML (Canvas)', function ($itemScope) {
                window.location = '/api/download/icon/xaml/' + $scope.icon.id;
            }],
            ['Download .XAML (DrawImage)', function ($itemScope) {
                window.location = '/api/download/icon/xamldrawimage/' + $scope.icon.id;
            }],
            ['View SVG', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'svgViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View XAML Canvas', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'xamlViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View XAML DrawingImage', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'xamlDrawImageViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View Vector Drawable', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'drawableViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
        ];

        $scope.downloadThumbnail36 = [
            ['Download .PNG 36x36', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $scope.icon.id + '/36';
            }],
            null,
            ['Download .PNG 24x24', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $scope.icon.id;
            }],
            ['Download .PNG 48x48', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $scope.icon.id + '/48';
            }],
            ['Download .SVG Compressed', function ($itemScope) {
                window.location = '/api/download/icon/svg/' + $scope.icon.id;
            }],
            ['Download .SVG Webfont', function ($itemScope) {
                window.location = '/api/download/icon/svgwebfont/' + $scope.icon.id;
            }],
            ['Download .XAML (Canvas)', function ($itemScope) {
                window.location = '/api/download/icon/xaml/' + $scope.icon.id;
            }],
            ['Download .XAML (DrawImage)', function ($itemScope) {
                window.location = '/api/download/icon/xamldrawimage/' + $scope.icon.id;
            }],
            ['View SVG', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'svgViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View XAML Canvas', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'xamlViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View XAML DrawingImage', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'xamlDrawImageViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View Vector Drawable', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'drawableViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
        ];

        $scope.downloadThumbnail48 = [
            ['Download .PNG 48x48', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $scope.icon.id + '/48';
            }],
            null,
            ['Download .PNG 36x36', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $scope.icon.id + '/36';
            }],
            ['Download .PNG 24x24', function ($itemScope) {
                window.location = '/api/download/icon/png/' + $scope.icon.id;
            }],
            ['Download .SVG Compressed', function ($itemScope) {
                window.location = '/api/download/icon/svg/' + $scope.icon.id;
            }],
            ['Download .SVG Webfont', function ($itemScope) {
                window.location = '/api/download/icon/svgwebfont/' + $scope.icon.id;
            }],
            ['Download .XAML (Canvas)', function ($itemScope) {
                window.location = '/api/download/icon/xaml/' + $scope.icon.id;
            }],
            ['Download .XAML (DrawImage)', function ($itemScope) {
                window.location = '/api/download/icon/xamldrawimage/' + $scope.icon.id;
            }],
            ['View SVG', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'svgViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View XAML Canvas', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'xamlViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ,
            ['View XAML DrawingImage', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'xamlDrawImageViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
            ['View Vector Drawable', function ($itemScope) {
                $uibModal.open({
                    templateUrl: 'drawableViewer.html',
                    controller: 'CodeViewerController',
                    size: 'lg',
                    resolve: {
                        icon: function () {
                            return $itemScope.icon;
                        }
                    }
                });
            }],
        ];


    }
]);